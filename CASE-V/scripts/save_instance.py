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
server = sys.argv[2]
new_image = sys.argv[3]

conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name=project_name,
	user_domain_id='default',
	project_domain_id='default')

for instance in conn.compute.servers():
	if instance.name == server:
		conn.compute.create_server_image(instance.id, new_image)