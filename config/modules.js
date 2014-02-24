var path = require("path"),
	express = require("express"),
    _ = require("underscore"),
    mongoose = require('mongoose'),
    Users = require('../models/user'),
    Test = require('../models/test'),
    Question = require('../models/question'),
    Nav = require('../models/nav'),
    Problem = require('../models/problem');


var MONGOHQ_URL = 'mongodb://mbahoshy:07maryJ68@widmore.mongohq.com:10000/tradeTrainer_copy';
var Schema = mongoose.Schema;

mongoose.connect(MONGOHQ_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('successfully connected to database!');
});

function getClasses (req, res) {
	Nav.find({}, '', function(err, data) {
	    var classdata = [];
        var numClasses = data.length;
        for (var i = 0; i < numClasses; i ++) {
        	var datajson = data[i].toJSON();
            var z = _.pluck(datajson.chapters, 'lessons');
            var y = _.pluck(datajson.chapters, 'problems');
            var x = _.pluck(datajson.chapters, 'tests');

            var numlessons = getLength(z);
            var numproblems = getLength(y);
            var numtest = getLength(x);

            var t = {};
            t.snippet = datajson.snippet;
            t._id = datajson._id;
            t.level = datajson.level;
            t.active = datajson.active;
            t.name = datajson.name;
            t.total = numlessons + numproblems + numClasses;

            classdata.push(t);

            function getLength(category) {
                var length = category.length;
                var number = 0;

                for (var q = 0; q < length; q++) {
                    number = number + category[q].length;
                }

                return number;
            }
        }

    	res.json(classdata);
	});
}

function getProblemList (req, res) {
	var id = req.param("id");
	Problem.find({classroomid: id}, function(err, documents){
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
	if (id === 'all') {
		Nav.find({}, function(err, documents) {
			res.json(documents);
		});	
	} else {
		if (id == 'reset') {
			id = req.session.classid;
		} else {
			req.session.classid = id
		}

		Nav.findById(id, function(err, documents){
			res.json(documents);
		});
	}
}

var gamejson = mongoose.model('gamejson', 
           new Schema({}), 
           'GameJson');



function getUser (req, res){
	var tmpuser = {};
	tmpuser = _.omit(req.user, ['pword', 'email', 'hash', 'salt']);
	res.json(req.user);
	
}

function updateLessonProgress (req, res) {
	var chapterid = req.param("chapterid"),
		lessonid = req.param("lessonid"),
		date = req.param("date"),
		classid = req.param("classid"),
		update,
		user = req.user,
		userid = req.user._id;

	var conditions = { _id: userid },
	    options = { multi: false };

	var lessonCheck = _.findWhere(user.lessonProgress, {lessonid: lessonid});

	if (!lessonCheck) {
		var lessonmodel = {
	      lessonid: lessonid,
	      chapterid: chapterid,
	      classid: classid,
	      attemps: "",
	      timestamp: date,
	      completed: true
	    };

	    update = { $addToSet: { lessonProgress: lessonmodel }};
	    Users.update(conditions, update, options, callback);
	}


	function callback (err, numAffected) {
		if(err) throw err;
		res.end();
	}
}

function updateProblemProgress (req, res) {
	var problemname = req.param("problemname"),
		classid = req.param("classid"),
		chapterid = req.param("chapterid"),
		problemid = req.param("problemid"),
		answerid = req.param("answerid"),
		optionid = req.param("optionid"),
		level = req.param("level"),
		problemnumber = req.param("problemnumber"),
		numberOfQuestions = req.param("numberOfQuestions"),
		user = req.user,
		userid = req.user._id,
		conditions,
		update,
		unlock,
		tags,
		options = { multi: false };

		console.log('answerid');
		console.log(answerid);

	Problem.findById(answerid, function(err, documents){
		var data = documents.toJSON();
		var answer = _.findWhere(data.answers, {problemnumber: problemnumber});
		console.log('answer');
		console.log(optionid);
		console.log(answer.answerid);
		tags = answer.tags
		if (answer.answerid == optionid) {
			unlock = true;
		} else {
			unlock = null;
		}
		updateProblem();
	});

 	

 	function updateProblem () {
 		var currentProblem = _.findWhere(user.problemProgress, {problemid: problemid, level:level});
		if (currentProblem) {
			
			conditions = { _id: userid, "problemProgress.problemid": problemid };
			var currentScore = currentProblem.score[problemnumber];

			if (currentScore) {
				var currentAttempts = currentProblem.score[problemnumber].attempts;
				currentAttempts++;
				currentProblem.score[problemnumber].attempts = currentAttempts;
			} else {
				currentProblem.score[problemnumber] = {
					attempts: 1,
					unlocked: false,
					tags: tags
				}

			}

			if (currentProblem.score[problemnumber].unlocked === true) {
				console.log('no update');
				update = {};
			} else if (unlock === true) {
				console.log('unlock new problem');
				currentProblem.score[problemnumber].unlocked = true;
				var unlockedlength = _.where(currentProblem.score, {unlocked:true}).length;
				console.log("unlock length : " + unlockedlength);
					if (unlockedlength == numberOfQuestions) {
						console.log('problem complete');
						update = { $set: { "problemProgress.$.score": currentProblem.score, "problemProgress.$.completed": true }};
					} else {
						console.log('problem not finished');
						update = { $set: { "problemProgress.$.score": currentProblem.score}};
					}	
			} else {
				update = { $set: { "problemProgress.$.score": currentProblem.score }};
			}
		
		} else {
			conditions = { _id: userid };
			var problemmodel = {
			  classid: classid,
		      problemname: problemname,
		      problemid: problemid,
		      numberOfQuestions: numberOfQuestions,
		      completed: false,
		      level: level,
		      score: [{attempts: 1, unlocked: unlock, tags:[] }],
		    };


			update = { $addToSet: { problemProgress: problemmodel }};

			console.log("Problem Does Not Exist");
		}

		Users.update(conditions, update, options, callback);
	}


    function callback (err, numAffected) {
		if(err) throw err;
		console.log('unlock');
		console.log(unlock);
		res.json({unlock: unlock});
	}

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

function sendReport (req, res) {
	res.json(reportTemplate);
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

function getTest (req, res) {
	var testid = req.param("testid");
	var response = [];
	var wait = 0;
	
	Test.findById(testid,  function(err, documents){
		var test = documents.toJSON();
		var numquestions = test.questions.length;

		for (var i = 0; i < numquestions; i++) {

			Question.findById(test.questions[i], function(qerr, doc) {
				
				var qdata = doc.toJSON();
				var tmpobject = {};

				tmpobject.qtxt = qdata.qtxt;
				tmpobject.options = _.where(qdata.options, {active:true});
				tmpobject.qid = qdata._id;

				response.push(tmpobject);
				wait ++;
				respond();
				
			});
			function respond () {
				if (wait === numquestions) {
					res.json(response);
				}
			}
		}

	});


}

function postTest (req, res) {
	var testid = req.param("testid"),
		chapterid = req.param("chapterid"),
		optionid = req.param("optionid"),
		questionid = req.param("questionid"),
		completed = req.param("completed"),
		classid = req.session.classid,
		numquestions = req.param("numberOfQuestions"),
		user = req.user,
		userid = req.user._id,
		conditions,
		update,
		tags,
		correct,
		options = { multi: false };

		if (completed == "true") {completed = true;}
 	

 	Question.findById(questionid, function (err, documents) {
 		var data = documents.toJSON();
 		tags = data.tags;
 		if (data.answer == optionid) {
 			correct = true;
 		} else {
 			correct = false;
 		}

 		updateTest();
 	});

 	var currentTest = _.findWhere(user.testProgress, {testid: testid});

 	function updateTest () {
		if (currentTest) {
			console.log('test exists');

			if (currentTest.completed !== true) {
				console.log("Updating test ... ");
				conditions = { _id: userid, "testProgress.testid": testid };

				currentTest.score.push({option: optionid, question: questionid, correct: correct, tags: tags} );
				console.log("completed");
				console.log(completed);
				if (completed === true) {
					console.log("complete true");
					update = { $set: { "testProgress.$.score": currentTest.score, "testProgress.$.completed": true }};
				} else {
					update = { $set: { "testProgress.$.score": currentTest.score }};
				}
			} else {
				console.log("Test has already been completed. No update.");
				res.end();
			}

		} else {
			conditions = { _id: userid };
			var testmodel = {
			  classid: classid,
		      chapterid: chapterid,
		      testid: testid,
		      completed: completed,
		      numberOfQuestions: numquestions,
		      score: [{option: optionid, question: questionid, correct: correct, tags: tags} ]
		    };

			update = { $addToSet: { testProgress: testmodel }};

			console.log("Problem Does Not Exist");
		}



		Users.update(conditions, update, options, callback);
	}

    function callback (err, numAffected) {
		if(err) throw err;
		console.log("Test update complete");
		res.end();
	}

	console.log(testid + '   ' + chapterid + '   ' + optionid + '   ' + classid);
	// res.end();

}

exports.postTest = postTest;
exports.getTest = getTest;
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
exports.sendReport = sendReport;



var reportTemplate = [
	{title:"Breaker", tag:"brkr", expand:['breaker_120', 'breaker_240']},
	{title:"Relay", tag:"relay", expand:['relay_120', 'relay_240']},
	{title:"Capacitor", tag:"cap", expand:[]},
	{title:"Sequencer", tag:"seq", expand:[]},
	{title:"Thermostat", tag:"stat", expand:[]},
	{title:"Motors", tag:"motor", expand:['i-fan_120', 'i-fan_240', 'o-fan_120', 'o-fan_240']},




]
















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