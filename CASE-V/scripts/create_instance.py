from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys

image_name = sys.argv[1]

conn = connection.Connection(auth_url=env['OS_AUTH_URL'],
	username=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_name='demo',
	user_domain_id='default',
	project_domain_id='default')

network_name = ""
for network in conn.network.networks():
	network_name = network.name

image = conn.compute.find_image(image_name)
flavor = conn.compute.find_flavor("m1.medium")
network = conn.network.find_network(network_name)

server = conn.compute.create_server(name="test", image_id=image.id, flavor_id=flavor.id, networks=[{"uuid": network.id}])
server = conn.compute.wait_for_server(server)
print server.status
