var path = require("path"),
    express = require("express"),
    _ = require("underscore"),
    mod = require('./js/modules');

var passport = require("passport"); // require passport

var mongoose = require('mongoose');

require('./config/mongoose');

require('./models/user');

require('./config/passport')(passport); // config passport, pass in passport as parameter

var app = express()
            .use(express.static(__dirname, 
                                path.join(__dirname, "pages"),
                                path.join(__dirname, "js")))
            .use(express.bodyParser());


app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'SECRET' }));
app.use(passport.initialize()); //initialize passport
app.use(passport.session()); //create passport session

require('./config/routes')(app, passport);






//set port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);


//app.use(express.cookieParser());
/*
app.use(express.cookieParser('1234567890QWERTY'));    
app.use(express.cookieSession());
*/