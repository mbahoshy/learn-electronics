var path = require("path"),
    express = require("express"),
    _ = require("underscore"),
    mod = require('./js/modules');

var passport = require("passport");

var mongoose = require('mongoose');




require('./config/mongoose')();

var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
	username: String,
	pword: String,
	hash: String
});


var Users = mongoose.model('users', userSchema, 'Users');

require('./config/passport')(passport, Users);

var app = express()
            .use(express.static(__dirname, 
                                path.join(__dirname, "pages"),
                                path.join(__dirname, "js")))
            .use(express.bodyParser());

//app.use(express.cookieParser());
/*
app.use(express.cookieParser('1234567890QWERTY'));    
app.use(express.cookieSession());
*/
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

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






//set port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);


