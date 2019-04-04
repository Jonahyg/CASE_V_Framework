from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json

user_name = sys.argv[1]
project_name = sys.argv[2]
pwd = sys.argv[3]

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

new_user = conn.identity.create_user(name=user_name, default_project_id=project_name, domain_id="default", password=pwd)

print "Done"
