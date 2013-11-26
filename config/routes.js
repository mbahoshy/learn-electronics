var mod = require('../js/modules');

module.exports = function (app, passport) {

	//responds with index.html
	app.get("/", function(req, res) {

	});

	//responds with hvac.html
	app.get("/classroom", mod.getClassroom);

	//respond with class info
	app.get("/class/:id", mod.getClass);

	//respond with user info
	app.get("/users/:id", mod.getUser);

	app.get('/slides/:id/:type', mod.returnSlides);

	app.get('/json/:id', mod.returnJson);

	app.get('/slideTemplate/:type', mod.slideTemplate);

	app.get('/nav/:type', mod.getNav);

	app.post('/login',
	  passport.authenticate('local', { successRedirect: '/',
	                                   failureRedirect: '/login'
	                                 })
	);


}