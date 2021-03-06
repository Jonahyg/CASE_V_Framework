#############Dependencies#################################
from os import environ as env
from openstack import connection
import openstack
import subprocess
import sys
import json

#########################Get Arguements From back-end server#############################
user = json.loads(sys.argv[1])
image_name = sys.argv[2]
instance_name = sys.argv[3]
network_name = sys.argv[4]

user = json.loads(sys.argv[1])
user_name = user["username"]
project_name = user["projectname"]
pwd = user["pwd"]
projectid = user["projectid"]

#######################Authenticate Script#########################################

conn = connection.Connection(
    region_name=env['OS_REGION_NAME'],
	auth=dict(
		auth_url=env['OS_AUTH_URL'],
	    username=user_name,
	    password=pwd,
	    project_id=projectid,
	    user_domain_id=env['OS_PROJECT_DOMAIN_ID']),
	compute_api_version=2,
	identity_interface=env['OS_INTERFACE'])


image = conn.compute.find_image(image_name)
flavor = conn.compute.find_flavor("coe.tiny")
if ("ubuntu" in image_name or "Ubuntu" in image_name):
	flavor = conn.compute.find_flavor("coe.medium")
elif ("windows" in image_name or "Windows" in image_name):
	flavor = conn.compute.find_flavor("coe.large")
network = conn.network.find_network(network_name)
server = conn.compute.create_server(name=instance_name, image_id=image.id, flavor_id=flavor.id, networks=[{"uuid": network.id}])
server = conn.compute.wait_for_server(server)
print server.status
