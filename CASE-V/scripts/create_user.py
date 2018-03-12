from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys

user_name = sys.argv[1]
password = sys.argv[2]
project = sys.argv[3] 

conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name='demo',
	user_domain_id='default',
	project_domain_id='default')

new_user = conn.identity.create_user(name=user_name, default_project_id=project, domain_id="default", password=password)

print "GG"
