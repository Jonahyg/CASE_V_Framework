var express = require('express');
var app = express();
var User = require('./models/User');
var mongoose = require('mongoose');
var PythonShell = require('python-shell');
var bodyParser = require('body-parser');
var fs = require('fs');
var auth = require('./controllers/auth');
var jwt = require('jwt-simple');
var moment = require('moment');
/*
app.post('/app/message', function(req, res){
    console.log(req.body);
    res.status(200);
})
*/
////////////////////Script Pre////////////////////////////////////////////////
var options = {};
function setOptions(arguements)
{
	options = {
		scriptPath: '../scripts',
		args: arguements,
		pythonOptions: ['-u']
	};
}




///////////////////////////////Middleware///////////////////////////////////
app.use(function(req, res, next)
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})
app.use(bodyParser.json());

function checkAuthenticated(req, res, next)
{
	if(!req.header('Authorization'))
	{
		return res.status(401).send({message: 'Please make sure request has an Authorization Header'});
	}
	var token = req.header('Authorization').split(' ')[1];
	var payload = jwt.decode(token, 'secret');

	if(payload.exp <= moment().unix())
	{
		return res.status(401).send({message: 'Token has expired'});
	}
	req.user = payload.sub;
	console.log(req.user);
	next();
}


///////////////////////////Authentication//////////////////////////////////////
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);
app.get('/api/unverified', auth.getUnverifiedUsers);
app.post('/api/verify', auth.verifyUser);
app.post('/api/assign', function(req, res)
{
	setOptions(JSON.stringify(req.body.user));
	console.log(JSON.stringify(req.body.user));
	var shell = new PythonShell("create_project.py", options);
	shell.on('message', function (message)
	{
		console.log(message);
	})
	shell.end();
})


//////////////////////////User Privileges//////////////////////////////////////////
app.get('/api/levels', function(req, res)
{
	var privileges = JSON.parse(fs.readFileSync('privileges.json', 'utf8'));
	res.send(privileges["Levels"]);
})
app.get('/api/privileges', function(req, res)
{
	var privileges = JSON.parse(fs.readFileSync('privileges.json', 'utf8'));
	res.send(privileges);
})
app.post('/api/Privileges', function(req, res)
{
	console.log(req.body.privileges);
	var json = JSON.stringify(req.body.privileges, null, 4);
	fs.writeFile('privileges.json', json, 'utf8');
	res.send("Success");
})
app.get('/api/quotas', function(req, res)
{
	var quotas = JSON.parse(fs.readFileSync('quotas.json', 'utf8'));
	res.send(quotas);
})
app.post('/api/username', function(req, res)
{
	console.log(req.body.test);
	User.findOne({username: req.body.test}, function(err, user)
	{
		if(!user)
		{
			res.send(false);
		}
		else
			res.send(true);
	})
})
///////////////////////////Openstack API////////////////////////////////////////
app.post('/api/images', checkAuthenticated, function(req, res)
{
	//req.body.test.unshift(JSON.stringify(req.user))
	User.findById(req.user, function(err, user)
	{
		arr = req.body.test;
		console.log(user);
		console.log(JSON.stringify(user));
		arr.unshift(JSON.stringify(user));
		setOptions(arr);
		var shell = new PythonShell("list_images.py", options);
		shell.on('message', function (message)
		{
			console.log(message)
			res.send(message);
		})
		shell.end();
	})
})
app.post('/api/test', checkAuthenticated, function(req, res)
{
	console.log(req.body.test);
	User.findById(req.user, function(err, user)
	{
		arr = req.body.test;
		console.log(user);
		console.log(JSON.stringify(user));
		arr.unshift(JSON.stringify(user));
		setOptions(arr);
		var shell = new PythonShell("test.py", options);
		shell.on('message', function (message)
		{
			console.log(message)
			res.send(message);
		})
		shell.end();
		})
	
})
app.post('/api/instance', checkAuthenticated, function(req, res)
{
	User.findById(req.user, function(err, user)
	{
		arr = req.body.test;
		console.log(user);
		console.log(JSON.stringify(user));
		arr.unshift(JSON.stringify(user));
		setOptions(arr);
		var shell = new PythonShell("create_instance.py", options);
		shell.on('message', function (message)
		{
			console.log(message)
			res.send(message);
		})
		shell.end();
	})
})
app.post('/api/instances',checkAuthenticated, function(req, res)
{
	User.findById(req.user, function(err, user)
	{
		arr = req.body.test;
		console.log(user);
		console.log(JSON.stringify(user));
		arr.unshift(JSON.stringify(user));
		setOptions(arr);
		var shell = new PythonShell("list_instances.py", options);
		shell.on('message', function (message)
		{
			console.log(message)
			res.send(message);
		})
		shell.end();
	})
})
app.post('/api/show', checkAuthenticated, function(req, res)
{
	User.findById(req.user, function(err, user)
	{
		arr = req.body.test;
		console.log(user);
		console.log(JSON.stringify(user));
		arr.unshift(JSON.stringify(user));
		setOptions(arr);
		var shell = new PythonShell("show_instance.py", options);
		shell.on('message', function (message)
		{
			console.log(message);
			res.send(message);
		})
		shell.end();
	})
})

////////////////////////Connect to database/////////////////////////////////
mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("we are connected to mongo");
        
        //db.collection('messages').insertOne({'msg':'test'});
    }
    else
    {
    	console.log(err);
    }
})
///////////////////////Start Server////////////////////////////////////////////
var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port);
})

