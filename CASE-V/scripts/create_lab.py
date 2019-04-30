#############Dependencies#################################
from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json

#########################Get Arguements From back-end server#############################
user = json.loads(sys.argv[1])
trainingName = sys.argv[2]

user_name = user["username"]
project_name = user["projectname"]
pwd = user["pwd"]
projectid = user["projectid"]

#######################Authenticate Script#########################################

conn = connection.Connection(
    region_name=env['OS_REGION_NAME'],
	auth=dict(
		auth_url=env['OS_AUTH_URL'],
	    username=user_name,
	    password=pwd,
	    project_id=projectid,
	    user_domain_id=env['OS_PROJECT_DOMAIN_ID']),
	compute_api_version=2,
	identity_interface=env['OS_INTERFACE'])


with open('../back-end/training.json') as json_file:  
    data = json.load(json_file)

for i in range(1,len(data[trainingName])+1):
    instance = data[trainingName]['Instance'+str(i)]
    server = conn.compute.create_server(name=instance['VM_Name'], image_id=instance['vm_id'],flavor_id=instance['flavor_id'],networks=[{"uuid": instance['network_id']}])
    server = conn.compute.wait_for_server(server)
    print server.status
  