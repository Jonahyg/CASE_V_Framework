# Senior-Project
Case-v cloud experimentation environment


### Front-End Install Procedure
1. In a terminal window clone our repository from github.  
```git clone https://github.com/Jonahyg/Senior-Project.git```
2. Install nodejs and nodejs-legacy  
```sudo apt-get install -y nodejs nodejs-legacy```
3. Install Node Package Manager(npm)  
```sudo apt-get install -y npm```
4. Install yoeman  
```sudo npm install -g yo@latest```
5. Install gulp and bower  
```npm install gulp bower generator-gulp-angular angular-gulp```  
```sudo npm install --global gulp-cli```  
```sudo npm install -g bower```  
6. Change directories into 'Senioor-Project/CASE-V/front-end'
7. Run ```sudo npm install``` and ```sudo bower install --allow-root```  
8. Edit the index.modue.js file  
```sudo vi front-end/src/app/index.module.js```
9. You must change the apiURL variable to the public IP of the backend.  
 <img src="https://github.com/Jonahyg/Senior-Project/blob/master/apiURL.png">  

##### Launching the Front-End
In a terminal under the 'Senior-Project/CASE-V/front-end/' directory run ```gulp serve```

### Back-End Install Procedure
1. In a terminal window clone our repository from github.  
```git clone https://github.com/Jonahyg/Senior-Project.git```
2. Install nodejs and nodejs-legacy  
```sudo apt-get install -y nodejs nodejs-legacy```
3. Install Node Package Manager(npm)  
```sudo apt-get install -y npm```
4. Install mongodb clients and server  
```sudo apt install mongodb-clients mongodb-server```
5. Change directories to 'Senior-Project/CASE-V/back-end/' and install dependencies with npm.  
```sudo npm install```
6. Install python-dev and python-pip  
```sudo apt install python-pip python-dev```
7. Install the openstack CLI client  
```sudo pip install python-openstackclient```
8. Ensure the openstack CLI client is updated [Openstack CLI](https://docs.openstack.org/newton/user-guide/common/cli-install-openstack-command-line-clients.html)  
```sudo pip install --upgrade python-openstackclient```
##### Launching the Back-End
Before launching the Back-End always make sure you have sourced the appropriate openrc file from openstack.  
<img src="https://galaxyproject.org/cloud/jetstream/allocation/jetstream-os-api-creds.png">  
In a terminal under the 'Senior-Project/CASE-V/back-end/' directory run ```node server.js```

