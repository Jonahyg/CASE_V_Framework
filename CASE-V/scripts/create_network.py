#######################Dependencies#############################
from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json

######################Get Arguements from back-end Server##################################
user = json.loads(sys.argv[1])
user_name = user["username"]
project_name = user["projectname"]
pwd = user["pwd"]

#######################Authenticate Script################################################
conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name=project_name,
	user_domain_id='default',
	project_domain_id='default')
