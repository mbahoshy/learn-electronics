var mongoose = require('mongoose')
  , LocalStrategy = require('passport-local').Strategy
  , Users = mongoose.model('users');

module.exports = function (passport) {
	passport.use(new LocalStrategy(
	  function(username, password, done) {
	  	
	    Users.findOne({ username: username }, function(err, user) {

	      if (err) { return done(err); }
	      if (!user) {
	        return done(null, false, { message: 'Incorrect email.' });
	      }
	      if (user.password == password) {
	      	console.log('password good!');
	        return done(null, false, { message: 'Incorrect password.' });
	      }
	      
	      return done(null, user);
	    });
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