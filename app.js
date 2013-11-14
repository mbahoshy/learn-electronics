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

//respond with chapters
app.get("/chapters/:classid", function(req, res){
	var id = req.param("classid");
	var classroom = _.findWhere(MainDB);
	var record = _.findWhere(ChaptersDB, {classid: id});

	res.json(record.chapters);

});

//respond with class info
app.get("/class/:id", function(req, res){
	var id = req.param("id");
	var record = _.findWhere(MainDB, {classroomid: id});

	if(record) {
		res.json(record);
	} else {
		res.send("Sorry, the id " + id + " doesn't exist in the DB.");
	}

});



app.get("/lessons/:chapterid", function(req, res){
	var id = req.param("chapterid");
	var record = _.findWhere(MainDB, {chapterid: id});
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





var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);


var MainDB = [
	{classroomid: "0", name:"HVAC", snippet:"Become a service technician", chapters:[
		{chapterid:"0", name:"The Basics", snippet:"Volts, Amps, and Ohms - an introduction", lessons: [
			{lessonid:"0", name:"Chapter 1 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
			{lessonid:"1", name:"Chapter 1 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
			{lessonid:"2", name:"Chapter 1 Lesson 3", snippet:"Swithes and Relays - an introduction", content:{}}
		]},
		{chapterid:"1", name:"Putting It Together", snippet:"Learn how Volts, Amps, and Ohms work together", lessons:[
			{lessonid:"0", name:"Chapter 2 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
			{lessonid:"1", name:"Chapter 2 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
			{lessonid:"2", name:"Chapter 2 Lesson 3", snippet:"Swithes and Relays - an introduction", content:{}}
		]},
		{chapterid:"2", name:"Switches and Relays", snippet:"Swithes and Relays - an introduction", lessons:[
			{lessonid:"0", name:"Chapter 3 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
			{lessonid:"1", name:"Chapter 3 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
			{lessonid:"2", name:"Chapter 3 Lesson 3", snippet:"Swithes and Relays - an introduction", content:{}}
		]}
	]}
];


var UsersDB = [
	{id:"0", name:"Matthew", email:"mbahoshy@gmail.com", level:"Journeyman", progress:"75"},
	{id:"1", name:"Joe", email:"jpup@hotmail.com", level:"Apprentice", progress:'75'},
	{id:"2", name:"Mountain Dew", email:"mdForReal@gmail.com", level:"Journeyman", progress:'75'}
];

/*

var ChaptersDB = [
	{classid:"0", chapters:[
		{id:"0", name:"The Basics", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
		{id:"1", name:"Putting It Together", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
		{id:"2", name:"Switches and Relays", snippet:"Swithes and Relays - an introduction", content:{}}
	]}
]

var classrooms = [
	{id:"0", name:"HVAC", snippet:"Become a service technician"}
];



var LessonsDB = [
	{chapterid:"0", lessons: [
		{id:"0", name:"Chapter 1 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
		{id:"1", name:"Chapter 1 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
		{id:"2", name:"Chapter 1 Lesson 3", snippet:"Swithes and Relays - an introduction", content:{}}
	]},
	{chapterid:"1", lessons:[
		{id:"0", name:"Chapter 2 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
		{id:"1", name:"Chapter 2 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
		{id:"2", name:"Chapter 2 Lesson 3", snippet:"Swithes and Relays - an introduction", content:{}}
	]},
	{chapterid:"2", lessons:[
		{id:"0", name:"Chapter 3 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
		{id:"1", name:"Chapter 3 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
		{id:"2", name:"Chapter 3 Lesson 3", snippet:"Swithes and Relays - an introduction", content:{}}
	]}
];


*/