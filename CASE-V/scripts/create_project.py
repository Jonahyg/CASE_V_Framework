from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json
import ast


user = json.loads(sys.argv[1])
user_name = user["username"]
project_name = user["projectname"]
pwd = user["pwd"]

quotas = ast.literal_eval(user["quotas"])


conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name='demo',
	user_domain_id='default',
	project_domain_id='default')


project = conn.identity.create_project(name=project_name, domain_id="default", enabled=True, is_domain=False)
done = False
while(done == False):
	if project:
		subprocess.check_output(["openstack", "quota", "set", project_name, "--cores", str(quotas["VCPUs"])])
		subprocess.check_output(["openstack", "quota", "set", project_name, "--instances", str(quotas["Instances"])])
		subprocess.check_output(["openstack", "quota", "set", project_name, "--volumes", str(quotas["Volumes"])])
		subprocess.check_output(["openstack", "quota", "set", project_name, "--ram", str(quotas["RAM (MB)"])])
		subprocess.check_output(["openstack", "quota", "set", project_name, "--networks", str(quotas["Networks"])])
		print user_name + " :" + project_name + ":" + pwd
		new_user = conn.identity.create_user(name=user_name, domain_id="default", password=pwd)
		done = True
print "Done"