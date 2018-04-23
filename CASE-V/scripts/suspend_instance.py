from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json
import time


user = json.loads(sys.argv[1])
user_name = user["username"]
project_name = user["projectname"]
pwd = user["pwd"]
server = sys.argv[2]
conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name=project_name,
	user_domain_id='default',
	project_domain_id='default')


for instance in conn.compute.servers():
	if instance.name == server:
		if instance.status ==  'ACTIVE':
			conn.compute.suspend_server(instance.id)
			time.sleep(7)
		else:
			conn.compute.resume_server(instance.id)
			time.sleep(5)
			#print server.status
		print "Done"