from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json


user = json.loads(sys.argv[1])
user_name = user["username"]
project_name = user["projectname"]
pwd = user["pwd"]
conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=user_name,
	password=pwd,
	project_name=project_name,
	user_domain_id='default',
	project_domain_id='default')

instances = ""
for instance in conn.compute.servers():
	instances += instance.name + " "

	
instances = instances[:-1]
print instances