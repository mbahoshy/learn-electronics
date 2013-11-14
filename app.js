var path = require("path"),
    express = require("express"),
    _ = require("underscore");

var app = express()
            .use(express.static(__dirname, 
                                path.join(__dirname, "pages"),
                                path.join(__dirname, "js")))
            .use(express.bodyParser());

app.get("/", function(req, res) {

});

app.get("/classroom", function(req, res) {
    res.sendfile('pages/hvac.html');
});

app.get("/chapters/:classid", function(req, res){
	var id = req.param("classid");
	var record = _.findWhere(ChaptersDB, {classid: id});
	res.json(record.chapters);

});

app.get("/lessons/:chapterid", function(req, res){
	var id = req.param("chapterid");
	var record = _.findWhere(LessonsDB, {chapterid: id});
	res.json(record.lessons);

});

app.get("/users/:id", function(req, res){
	var id = req.param("id");
	var record = _.findWhere(UsersDB, {id: id});

	if(record) {
		res.json(record);
	} else {
		res.send("Sorry, the id " + id + " doesn't exist in the DB.");
	}

});

app.get("/class/:id", function(req, res){
	var id = req.param("id");
	var record = _.findWhere(classrooms, {id: id});

	if(record) {
		res.json(record);
	} else {
		res.send("Sorry, the id " + id + " doesn't exist in the DB.");
	}

});



var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);


var LessonsDB = [
	{chapterid:"0", lessons: [
		{id:"0", name:"Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
		{id:"1", name:"Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
		{id:"2", name:"Lesson 3", snippet:"Swithes and Relays - an introduction", content:{}}
	]},
	{chapterid:"1", lessons:[

	]}
];

var ChaptersDB = [
	{classid:"0", chapters:[
		{id:"0", name:"The Basics", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
		{id:"1", name:"Putting It Together", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
		{id:"2", name:"Switches and Relays", snippet:"Swithes and Relays - an introduction", content:{}}
	]}
]

var UsersDB = [
	{id:"0", name:"Matthew", email:"mbahoshy@gmail.com", level:"Journeyman", progress:"75"},
	{id:"1", name:"Joe", email:"jpup@hotmail.com", level:"Apprentice", progress:'75'},
	{id:"2", name:"Mountain Dew", email:"mdForReal@gmail.com", level:"Journeyman", progress:'75'}
];

var classrooms = [
	{id:"0", name:"HVAC", snippet:"Become a service technician"}
];