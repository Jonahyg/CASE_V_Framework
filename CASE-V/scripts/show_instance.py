from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys

conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name='demo',
	user_domain_id='default',
	project_domain_id='default')

vm_name = sys.argv[1]
rae = subprocess.check_output(["openstack", "console", "url", "show", vm_name])
rae2 = rae.split("url   | ", 1)[1]
rae3 = rae2.split(" |", 1)[0]
print rae3