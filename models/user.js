var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
	username: String,
	pword: String,
	firstName:  String,
	lastName:   String,
	email:      String
});

userSchema.statics.isValidUserPassword = function(email, password, done) {
			
	this.findOne({ email: email }, function(err, user) {
	  if (err) { return done(err); }
	  if (!user) {
	    return done(null, false, { message: 'Incorrect email.' });
	  }
	  if (user.pword == password) {
	  	console.log('password good!');
	    return done(null, user);
	  }
	  return done(null, false, { message: 'Incorrect password.' });
	  
	});
};

userSchema.statics.signup = function(email, password, done){
	Users.create({
		email : email,
		pword : password,
	}, function(err, user){
		if(err) throw err;
		// if (err) return done(err);
		done(null, user);
	});

});


var Users = mongoose.model('users', userSchema, 'Users');
module.exports = Users;