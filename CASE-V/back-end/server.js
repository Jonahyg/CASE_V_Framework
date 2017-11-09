var express = require('express');
var app = express();
var mongoose = require('mongoose');
/*
app.post('/app/message', function(req, res){
    console.log(req.body);
    res.status(200);
})
*/
mongoose.connect("mongodb://localhost:27017/test", function(err,db){
    if(!err){
        console.log("we are connected to mongo");
        
        //db.collection('messages').insertOne({'msg':'test'});
    }
})

var server = app.listen(5000, function(){
    console.log('listening on port ', server.address().port);
})