from os import environ as env
from keystoneauth1 import session
from keystoneauth1.identity import v3
from keystoneclient.v3 import client
import glanceclient.v2.client as glclient

auth = v3.Password(auth_url=env['OS_AUTH_URL'],
	user_id=env['OS_USERNAME'],
	password=env['OS_PASSWORD'],
	project_id=env['OS_PROJECT_ID'])

sess = session.Session(auth=auth)
keystone = client.Client(session=sess)

users = keystone.users.list()
print users

#glance_endpoint = keystone.service_catalog.url_for(service_type='image')
#glance = glclient.Client(glance_endpoint, token=keystone.auth_token)
#images = glance.images.list()
#print images
#print list(images)