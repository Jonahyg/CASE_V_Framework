from os import environ as env
from openstack import connection
import openstack
import subprocess

conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name='demo',
	user_domain_id='default',
	project_domain_id='default')

instances = ""
for instance in conn.compute.servers():
	instances += instance.name + " "

	
instances = instances[:-1]
print instances