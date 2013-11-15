var path = require("path"),
	express = require("express"),
    _ = require("underscore");

function getClassroom (req, res) {
    res.sendfile('pages/hvac.html');
}

function getClass (req, res){
	var id = req.param("id");
	var record = _.findWhere(MainDB, {classroomid: id});

	if(record) {
		res.json(record);
	} else {
		res.send("Sorry, the id " + id + " doesn't exist in the DB.");
	}

}

function getUser (req, res){
	var id = req.param("id");
	var record = _.findWhere(UsersDB, {id: id});
	if(record) {
		res.json(record);
	} else {
		res.send("Sorry, the id " + id + " doesn't exist in the DB.");
	}
}

exports.getClassroom = getClassroom;
exports.getClass = getClass;
exports.getUser = getUser;


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


var UsersDB = [{
	id:"2",
	name:"Mountain Dew",
	email:"mdForReal@gmail.com",
	level:"Journeyman",
	totalprogress:'75',
	progress: [
	{classroomid: "0", progress:"50%", chapterscompleted:"2", lessonscomleted:"22", problemscompleted:null, averagescore:null, chapters:[
		{chapterid:"0", progress: "100%", lessonscompleted:"10", problemscomleted:"5", lessons: [
			{lessonid:"0", completed:true, content:{}},
			{lessonid:"1", completed:false, content:{}},
			{lessonid:"2", completed:true, content:{}}
		]},
		{chapterid:"1", progress: "100%", lessonscompleted:"10", problemscomleted:"5", lessons:[
			{lessonid:"0", completed:false, content:{}},
			{lessonid:"1", completed:false, content:{}},
			{lessonid:"2", completed:true, content:{}}
		]},
		{chapterid:"2", progress: "100%", lessonscompleted:"10", problemscomleted:"5", lessons:[
			{lessonid:"0", completed:true, content:{}},
			{lessonid:"1", completed:false, content:{}},
			{lessonid:"2", completed:false, content:{}}
		]}
	]}
	]
}];