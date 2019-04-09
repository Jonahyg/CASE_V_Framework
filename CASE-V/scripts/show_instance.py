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
	compute_api_version=2,
	identity_interface=env['OS_INTERFACE'])


vm_name = sys.argv[2]
rae = subprocess.check_output(["openstack", "console", "url", "show", "--novnc", vm_name])
rae2 = rae.split("url   | ", 1)[1]
rae3 = rae2.split(" |", 1)[0]
print rae3
