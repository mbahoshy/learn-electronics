var path = require("path"),
	express = require("express"),
    _ = require("underscore"),
    mongoose = require('mongoose'),
    Users = require('../models/user'),
    Nav = require('../models/nav'),
    Problem = require('../models/problem');


var MONGOHQ_URL = 'mongodb://mbahoshy:07maryJ68@dharma.mongohq.com:10062/tradeTrainer';
var Schema = mongoose.Schema;

mongoose.connect(MONGOHQ_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('successfully connected to database!');
});

function getClasses (req, res) {
	Nav.find({}, 'name snippet active', function(err, documents) {
		res.json(documents);
	});
}

function getProblemList (req, res) {
	var level = req.param("level");
	console.log(level);
	Problem.find({level: level}, function(err, documents){
		res.json(documents[0]);
	});
}

function getProblemSlides (req, res) {
	var id = req.param("id");
	console.log(id);
	res.sendfile('./problems/' + id + '.html');

}

function getNav (req, res) {
	var id = req.param("classid");
	if (id == 'reset') {
		id = req.session.classid;
	} else {
		req.session.classid = id
	}

	Nav.findById(id, function(err, documents){
		res.json(documents);
	});
}

var gamejson = mongoose.model('gamejson', 
           new Schema({}), 
           'GameJson');



function getUser (req, res){
	var tmpuser = {};
	tmpuser = _.omit(req.user, 'pword', 'email', 'hash', 'salt');
	res.json(req.user);
	
}

function updateLessonProgress (req, res) {
	var chapterid = req.param("chapterid"),
		lessonid = req.param("lessonid"),
		lessontype = req.param("lessontype"),
		date = req.param("date"),
		classid = req.session.classid,
		userid = req.user._id;

	var lessonmodel = {
      lessonid: lessonid,
      chapterid: chapterid,
      classid: classid,
      lessontype: lessontype,
      attemps: "",
      timestamp: date,

      completed: true
    };

	var conditions = { _id: userid }
	  , update = { $addToSet: { lessonProgress: lessonmodel }}
	  , options = { multi: false };

	Users.update(conditions, update, options, callback);

	function callback (err, numAffected) {
		if(err) throw err;
		res.end();
	}
}

function updateProblemProgress (req, res) {
	var problemname = req.param("problemname"),
		problemid = req.param("problemid"),
		level = req.param("level"),
		problemnumber = req.param("problemnumber"),
		attempt = req.param("attempt"),
		unlock = req.param("unlock"),
		user = req.user,
		userid = req.user._id,
		conditions,
		update,
		options = { multi: false };

	problemnumber--;

	console.log(problemname + problemid + level + problemnumber);

 	var currentProblem = _.findWhere(user.problemProgress, {problemid: problemid, level:level});

	if (currentProblem) {
		conditions = { _id: userid, "problemProgress.problemid": problemid };
		var currentAttempts = currentProblem.score[problemnumber];
		if (isNaN(currentAttempts)) {
			currentAttempts = 0;
		}

		currentAttempts++;

		var t = _.pluck(user.problemProgress, "problemid");
		var c = _.indexOf(t, problemid);

		currentProblem.score[problemnumber] = currentAttempts;

		if (currentProblem.unlocked[problemnumber] === true) {
			update = { $set: { "problemProgress.$.score": currentProblem.score }};
		} else if (unlock === true) {
			currentProblem.unlocked[problemnumber] = true;
			update = { $set: { "problemProgress.$.score": currentProblem.score }, $set: {"problemProgress.$.unlocked": currentProblem.unlocked}};
		} else {
			update = { $set: { "problemProgress.$.score": currentProblem.score }};
		}

		
	
	} else {
		conditions = { _id: userid };
		var problemmodel = {
	      problemname: problemname,
	      problemid: problemid,
	      level: level,
	      score: [1],
	      unlocked: [unlock]
	    };

		update = { $addToSet: { problemProgress: problemmodel }};

		console.log("Problem Does Not Exist");
	}

	Users.update(conditions, update, options, callback);

	
 	currentProblem = _.findWhere(user.problemProgress, {problemid: problemid, level:level});
 	console.log('update problem');
 	console.log(currentProblem);
 	
    function callback (err, numAffected) {
		if(err) throw err;
		res.end();
	}

    res.end();
}

function slideTemplate (req, res) {
	var type = req.param("type");
	if (type === 'lesson') {
		res.sendfile('./templates/slidetemplate.html');
	} else if (type === 'problem') {
		res.sendfile('./templates/problemtemplate.html');
	}
}

function Template (req, res) {
	var name = req.param("name");
	res.sendfile('./templates/' + name + '.html');
}

function returnSlides (req, res) {
	var id = req.param("id");


	res.sendfile('./slides/' + id + '.html');
}

function getSession (req, res) {
	var type = req.param("query");
	
	console.log(req.session[type]);
	console.log('lesson id: ' + req.session.lessonid); // log lesson id

	res.send(req.session[type]); //sends requested session data
}

function signUp (req, res, next) {
	Users.signup(req.body.lastName, req.body.firstName, req.body.email, req.body.password, function(err, user){
		if(err) throw err;
		req.login(user, function(err){
			if(err) return next(err);
			return res.redirect("/classroom.html");
		});
	});
}


exports.signUp = signUp;
exports.getSession = getSession;
exports.getUser = getUser;
exports.updateLessonProgress = updateLessonProgress;
exports.updateProblemProgress = updateProblemProgress;
exports.returnSlides = returnSlides;
exports.slideTemplate = slideTemplate;
exports.Template = Template;
exports.getClasses = getClasses;
exports.getNav = getNav;
exports.getProblemList = getProblemList;
exports.getProblemSlides = getProblemSlides;

// exports.getClassroom = getClassroom;
// exports.returnJson = returnJson;
// exports.getClass = getClass;

/*

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
*/

// function getClassroom (req, res) {
// 		res.redirect('pages/hvac.html');
// }

// function getClass (req, res){
// 	console.log(req.user);
// 	var id = req.param("id");
// 	if(id!=='reset') {
// 		req.session.classid = id;
// 	} else {
// 		id = req.session.classid;
// 	}
// 	NavData.find({"classid": id}, function(err, documents) {
// 		res.json(documents[0]);
// 	});

// }

// function returnJson (req, res) {
// 	var id = req.param("id");
// 	gamejson.find({"slideid": id}, function(err, documents) {
// 		res.json(documents[0]);
// 	});
// }