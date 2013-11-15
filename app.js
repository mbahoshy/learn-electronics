var path = require("path"),
    express = require("express"),
    _ = require("underscore"),
    mod = require('./js/modules');

var app = express()
            .use(express.static(__dirname, 
                                path.join(__dirname, "pages"),
                                path.join(__dirname, "js")))
            .use(express.bodyParser());


//responds with index.html
app.get("/", function(req, res) {});

//responds with hvac.html
app.get("/classroom", mod.getClassroom);

//respond with class info
app.get("/class/:id", mod.getClass);

//respond with user info
app.get("/users/:id", mod.getUser);

app.get('/slides/0', function(req, res) {
	res.sendfile('slides/tester.html');
});

//set port
var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);


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


//respond with chapters
app.get("/chapters/:classid", function(req, res){
	var id = req.param("classid");
	var classroom = _.findWhere(MainDB);
	var record = _.findWhere(ChaptersDB, {classid: id});

	res.json(record.chapters);

});



app.get("/lessons/:chapterid", function(req, res){
	var id = req.param("chapterid");
	var record = _.findWhere(MainDB, {chapterid: id});
	res.json(record.lessons);

});


*/