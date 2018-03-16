from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json

conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name='GT_Project',
	user_domain_id='default',
	project_domain_id='default')

for image in conn.compute.images():
	print image.name