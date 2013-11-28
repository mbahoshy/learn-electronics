var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , Users = mongoose.model('users');

module.exports = function (passport) {
	passport.use(new LocalStrategy({
			usernameField: 'email', //looks at form name 'email' for username
			passwordField: 'password' //looks at form name 'password' for password
	    },
		function(email, password, done) { //a function which takes three parameters
			Users.isValidUserPassword(email, password, done);
		}
	));

	passport.serializeUser(function(user, done) {
	        done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
	  Users.findById(id, function(err, user) {
		done(err, user);
	  });
    });
}