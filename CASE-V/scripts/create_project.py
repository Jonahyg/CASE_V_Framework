#############################Dependencies##############################
from os import environ as env
from openstack import connection
import openstack
import subprocess
import pymongo
import sys
import json
import ast

##########################Get Arguements From back-end server###############################
user = json.loads(sys.argv[1])
user_name = user["username"]
project_name = user["projectname"]
user_email = user["email"]
pwd = user["pwd"]

quotas = ast.literal_eval(user["quotas"])

###############Authenticate Script###########################################
conn = connection.Connection(
    region_name=env['OS_REGION_NAME'],
	auth=dict(
		auth_url=env['OS_AUTH_URL'],
	    username=env['OS_USERNAME'],
	    password=env['OS_PASSWORD'],
	    project_id=env['OS_PROJECT_ID'],
	    user_domain_id=env['OS_PROJECT_DOMAIN_ID']),
	compute_api_version=2,
	identity_interface=env['OS_INTERFACE'])

#############MongoDB Connection Script######################################
#####Connect and update the user tables with projectid per created user#####
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["test"]
	    
try:
  project = conn.identity.create_project(name=project_name, domain_id=env['OS_PROJECT_DOMAIN_ID'], enabled=True, is_domain=False)
  mydb["users"].update_one({"username":user_name},{"$set": {"projectid":project.id}})
except:
  print "Project name already exists"
done = False
while(done == False):
	subprocess.check_output(["openstack", "quota", "set", project_name, "--cores", str(quotas["VCPUs"])])
	subprocess.check_output(["openstack", "quota", "set", project_name, "--instances", str(quotas["Instances"])])
	subprocess.check_output(["openstack", "quota", "set", project_name, "--volumes", str(quotas["Volumes"])])
	subprocess.check_output(["openstack", "quota", "set", project_name, "--ram", str(quotas["RAM (MB)"])])
	subprocess.check_output(["openstack", "quota", "set", project_name, "--networks", str(quotas["Networks"])])
	print user_name + " :" + project_name + ":" + pwd
	try:
          new_user = conn.identity.create_user(name=user_name,password=pwd,email=user_email,default_project=project.id,enabled=True, domain_id=env['OS_PROJECT_DOMAIN_ID'])
          subprocess.call(["openstack", "role", "add", "--project", project_name, "--user", user_name, "Member"])
          subprocess.call(["openstack", "role", "add", "--project", project_name, "--user", env['OS_USERNAME'], "Admin"])
          done = True
	except:
          print "Username already exists"
          done = True
print "Done"
