var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
	username: String,
	pword: String,
	hash: String
});


var Users = mongoose.model('users', userSchema, 'Users');
module.exports = Users;