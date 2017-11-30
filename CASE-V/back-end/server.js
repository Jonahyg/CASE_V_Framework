var express = require('express');
var app = express();
var mongoose = require('mongoose');
var PythonShell = require('python-shell');
var bodyParser = require('body-parser');
/*
app.post('/app/message', function(req, res){
    console.log(req.body);
    res.status(200);
})
*/
var options = {};
function setOptions(arguements)
{
	options = {
		scriptPath: '../scripts',
		args: arguements,
		pythonOptions: ['-u']
	};
}
app.use(function(req, res, next)
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})
app.use(bodyParser.json());
app.post('/api/images', function(req, res)
{
	setOptions(req.body.test);
	var shell = new PythonShell("list_images.py", options);
	shell.on('message', function (message)
	{
		console.log(message)
		res.send(message);
	})
	shell.end();
})

app.post('/api/instance', function(req, res)
{
	setOptions(req.body.test);
	var shell = new PythonShell("create_instance.py", options);
	shell.on('message', function (message)
	{
		console.log(message)
		res.send(message);
	})
	shell.end();
})
app.post('/api/instances', function(req, res)
{
	setOptions(req.body.test);
	var shell = new PythonShell("list_instances.py", options);
	shell.on('message', function (message)
	{
		console.log(message)
		res.send(message);
	})
	shell.end();
})

mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("we are connected to mongo");
        
        //db.collection('messages').insertOne({'msg':'test'});
    }
})

var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port);
})

