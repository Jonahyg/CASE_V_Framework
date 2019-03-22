from os import environ as env
from openstack import connection
import openstack
import subprocess

conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name=env['OS_PROJECT_NAME'],
	user_domain_id='default',
	project_domain_id='default')

str = ''
str2 = ''
vm_name = "test"
for server in conn.compute.servers():
	str2 = server.id
	print(server.name)


for image in conn.image.images():
	print image.name
	
era = conn.compute.find_image(str)
print era

#ra = dir(conn.compute)
ra = conn.compute.__class__
print ra

rae = subprocess.check_output(["openstack", "console", "url", "show", vm_name])
rae2 = rae.split("url   | ", 1)[1]
rae3 = rae2.split(" |", 1)[0]
print rae3