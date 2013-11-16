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
		{chapterid:"0", active:true, name:"The Basics", snippet:"Volts, Amps, and Ohms - an introduction", lessons: [
			{lessonid:"0", active:true, name:"Chapter 1 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", slides:"cl0_ch0_l0"},
			{lessonid:"1", active:false, name:"Chapter 1 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", slides:"cl0_ch0_l1"},
			{lessonid:"2", active:false, name:"Chapter 1 Lesson 3", snippet:"Swithes and Relays - an introduction", slides:"cl0_ch0_l2"}
		]},
		{chapterid:"1", active:true, name:"Putting It Together", snippet:"Learn how Volts, Amps, and Ohms work together", lessons:[
			{lessonid:"0", name:"Chapter 2 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", slides:"cl0_ch1_l0"},
			{lessonid:"1", name:"Chapter 2 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", slides:"cl0_ch1_l0"},
			{lessonid:"2", name:"Chapter 2 Lesson 3", snippet:"Swithes and Relays - an introduction", slides:"cl0_ch1_l0"}
		]},
		{chapterid:"2", active:false, name:"Switches and Relays", snippet:"Swithes and Relays - an introduction", lessons:[
			{lessonid:"0", name:"Chapter 3 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", slides:"cl0_ch2_l0"},
			{lessonid:"1", name:"Chapter 3 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", slides:"cl0_ch2_l0"},
			{lessonid:"2", name:"Chapter 3 Lesson 3", snippet:"Swithes and Relays - an introduction", slides:"cl0_ch2_l0"}
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
	{classroomid: "0", progress:"50%", chapterscompleted:"2", lessonscomleted:"22", problemscompleted:null, averagescore:null, progress:[
		{chapterid:"0", progress: "100%", lessonscompleted:"10", problemscompleted:"5", lessons: [
			{lessonid:"0", completed:true},
			{lessonid:"1", completed:false},
			{lessonid:"2", completed:true}
		]},
		{chapterid:"1", progress: "100%", lessonscompleted:"10", problemscompleted:"5", lessons:[
			{lessonid:"0", completed:false},
			{lessonid:"1", completed:false},
			{lessonid:"2", completed:true}
		]},
		{chapterid:"2", progress: "100%", lessonscompleted:"10", problemscompleted:"5", lessons:[
			{lessonid:"0", completed:true},
			{lessonid:"1", completed:false},
			{lessonid:"2", completed:false}
		]}
	]}
	]
}];