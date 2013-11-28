var mod = require('../js/modules');
var Auth = require('./auth');

module.exports = function (app, passport) {

	//responds with index.html
	app.get("/", function(req, res) {


	});

	app.get("/vagina", function(req, res){
		console.log('wassi');
		if(req.isAuthenticated()){
		  console.log("authenticated user"); 
		}else{
			console.log("leave bitch"); 
		}
	});
	//responds with hvac.html
	app.get("/classroom", Auth.isAuthenticated, mod.getClassroom);

	//respond with class info
	app.get("/class/:id", mod.getClass);

	//respond with user info
	app.get("/users/:id", mod.getUser);

	app.get('/slides/:id/:type', mod.returnSlides);

	app.get('/json/:id', mod.returnJson);

	app.get('/slideTemplate/:type', mod.slideTemplate);

	app.get('/nav/:type', mod.getNav);

	app.post('/login',
	  passport.authenticate('local', { successRedirect: '/classroom/#0',
	                                   failureRedirect: '/'
	                                 })
	);

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('index.html');
	});


}