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
conn = connection.Connection(
    region_name=env['OS_REGION_NAME'],
	auth=dict(
		auth_url=env['OS_AUTH_URL'],
	    username=env['OS_USERNAME'],
	    password=env['OS_PASSWORD'],
	    project_id=env['OS_PROJECT_ID'],
	    user_domain_id=env['OS_PROJECT_DOMAIN_ID']),
	compute_api_version=env['OS_IDENTITY_API_VERSION'],
	identity_interface=env['OS_INTERFACE'])

networks = ""
for network in conn.network.networks():
	networks += network.name + " "

	
networks = networks[:-1]
print networks
