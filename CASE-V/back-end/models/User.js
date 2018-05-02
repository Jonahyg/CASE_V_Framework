//Model for User schema.
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	email: String,
	pwd: String,
	verified: Boolean,
	group: String,
	username:String,
	projectname:String,
	quotas:Object
});
