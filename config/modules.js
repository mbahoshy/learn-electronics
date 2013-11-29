var path = require("path"),
	express = require("express"),
    _ = require("underscore"),
    mongoose = require('mongoose');


var MONGOHQ_URL = 'mongodb://mbahoshy:07maryJ68@dharma.mongohq.com:10062/tradeTrainer';
var Schema = mongoose.Schema;

mongoose.connect(MONGOHQ_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('successfully connected to database!');
});

var NavData = mongoose.model('navdata', 
           new Schema({}), 
           'NavData');
var gamejson = mongoose.model('gamejson', 
           new Schema({}), 
           'GameJson');

function getClassroom (req, res) {
		res.redirect('pages/hvac.html');
}

function getClass (req, res){
	var id = req.param("id");
	if(id!=='reset') {
		req.session.classid = id;
	} else {
		id = req.session.classid;
	}
	NavData.find({"classid": id}, function(err, documents) {
		res.json(documents[0]);
	});

}

function getUser (req, res){
	//console.log('before' + req.session.userid);
	var id = req.param("id");

	if(id === 'reset') {
		id = req.session.userid;
		
	} else {
		
		req.session.userid = id;
		
		
	}
	
	var record = _.findWhere(UsersDB, {userid: id});
	if(record) {
		//console.log(record);
		res.json(record);
	} else {
		res.send("Sorry, the id " + id + " doesn't exist in the DB.");
	}
	
}

function returnJson (req, res) {
	var id = req.param("id");
	gamejson.find({"slideid": id}, function(err, documents) {
		res.json(documents[0]);
	});
}

function slideTemplate (req, res) {
	var type = req.param("type");
	if (type === 'lesson') {
		res.sendfile('./templates/slidetemplate.html');
	} else if (type === 'problem') {
		res.sendfile('./templates/problemtemplate.html');
	}
}

function returnSlides (req, res) {
	var id = req.param("id");
	var type = req.param("type");

	req.session.lessonid = id; // sets lesson id
	req.session.lessontype = type; // sets lesson type

	/*
	console.log('return slides called');
	console.log('lesson id: ' + req.session.lessonid); //log lesson id
	*/

	res.sendfile('./slides/' + id + '.html');
}

function getNav (req, res) {
	var type = req.param("type");
	
	//console.log(req.session[type]);
	//console.log('lesson id: ' + req.session.lessonid); // log lesson id

	res.send(req.session[type]); //sends requested session data
}

exports.getClassroom = getClassroom;
exports.getClass = getClass;
exports.getUser = getUser;
exports.returnJson = returnJson;
exports.returnSlides = returnSlides;
exports.slideTemplate = slideTemplate;
exports.getNav = getNav;


















var UsersDB = [{
	userid:"2",
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
