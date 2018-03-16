from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json

user = json.loads(sys.argv[1])
image_name = sys.argv[2]
instance_name = sys.argv[3]


user = json.loads(sys.argv[1])
user_name = user["username"]
project_name = user["projectname"]
pwd = user["pwd"]
conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=user_name,
	password=pwd,
	project_name=project_name,
	user_domain_id='default',
	project_domain_id='default')

network_name = ""
for network in conn.network.networks():
	network_name = network.name

image = conn.compute.find_image(image_name)
flavor = conn.compute.find_flavor("m1.tiny")
if image_name == "ubuntu":
	flavor = conn.compute.find_flavor("m1.medium")
network = conn.network.find_network(network_name)

server = conn.compute.create_server(name=instance_name, image_id=image.id, flavor_id=flavor.id, networks=[{"uuid": network.id}])
server = conn.compute.wait_for_server(server)
print server.status
