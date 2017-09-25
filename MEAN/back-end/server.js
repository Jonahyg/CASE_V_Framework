var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
<<<<<<< HEAD
var Message = require('./models/Message');
var User = require('./models/user');
=======

var auth = require('./controllers/auth');
var message = require('./controllers/message');
>>>>>>> 8b7a05e2bb966fbfc83fd089eee60d35c1428578

app.use(bodyParser.json());

app.use(function(req, res, next)
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
})
app.get('/api/message', message.get);

<<<<<<< HEAD
app.get('/api/message', GetMessages);
app.post('/api/message', function(req, res)
{
	console.log(req.body);
	var message = new Message(req.body);
=======
app.post('/api/message', message.post);
>>>>>>> 8b7a05e2bb966fbfc83fd089eee60d35c1428578

app.post('/auth/register', auth.register);

<<<<<<< HEAD
})
app.post('/auth/register', function(req, res)
{
	console.log(req.body);

	var user = new User(req.body);

	user.save(function(err, result))
	{
		if(err)
		{
			res.status(500).send(
				{
					message: err.message
				});
		}
		res.status(200);
	}
})
=======
>>>>>>> 8b7a05e2bb966fbfc83fd089eee60d35c1428578


mongoose.connect("mongodb://localhost:27017/test", function(err, db)
{
	if(!err)
	{
		console.log("we are connected to mongo");
	}
})
var server = app.listen(5000, function()
{
	console.log('listening on port', server.address().port)
})
