from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json

project_name = sys.argv[1]
#quotas = json.loads(sys.argv[2])
conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name='demo',
	user_domain_id='default',
	project_domain_id='default')


#project = conn.identity.create_project(name=project_name, domain_id="default", enabled=True, is_domain=False)
#print conn.current_project
#conn.compute.set_compute_quotas(name=project_name, ram=150);

print dir(conn)