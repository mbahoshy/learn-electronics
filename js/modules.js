var path = require("path"),
	express = require("express"),
    _ = require("underscore");


var mongoose = require('mongoose');
var MONGOHQ_URL = 'mongodb://mbahoshy:07maryJ68@dharma.mongohq.com:10062/tradeTrainer';
var Schema = mongoose.Schema;
//var Auth = require('./authorization');


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
	if(req.isAuthenticated()){
		console.log('welcome motha fucka');
		res.redirect('pages/hvac.html');
	} else {
		console.log('stay out ho');
		res.redirect('index.html');
	}
    
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
	console.log(type);
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

	console.log('return slides called');
	console.log('lesson id: ' + req.session.lessonid); //log lesson id

	res.sendfile('./slides/' + id + '.html');
}

function getNav (req, res) {
	var type = req.param("type");
	
	//console.log(req.session[type]);
	console.log('lesson id: ' + req.session.lessonid); // log lesson id

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

/*
var problem_set = {
	"problem_0" : {
		"switch": {

			//neutral
			"n1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			"line1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},

			//contacts
			"c2": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},
			"c3": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			
			//switch
			"spst1": {"on": true},
			"sc1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"sc2": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//wires
			"w1": {"Amps": 1.2},
			"w2": {"Amps": 1.2},
			"w3": {"Amps": 1.2},
			"w4": {"Amps": 1.2},
			"w5": {"Amps": 1.2},

			//light
			"l1": {"on": true},
			"l2": {"on": true},
			"l3": {"on": true},
			"lc1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"lc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//heater
			"heat1": {"on": true},
			"heat2": {"on": false},
			"heat3": {"on": false}


		},
		"noswitch": {
			//neutral
			"n1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			"line1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},

			//contacts
			"c2": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},
			"c3": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
						
			//switch
			"spst1": {"on": false},
			"sc1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"sc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//wires
			"w1": {"Amps": 0},
			"w2": {"Amps": 0},
			"w3": {"Amps": 0},
			"w4": {"Amps": 0},
			"w5": {"Amps": 0},

			//light
			"l1": {"on": false},
			"l2": {"on": false},
			"lc1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"lc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//heater
			"heat1": {"on": false},
			"heat2": {"on": true},
			"heat3": {"on": true}
			
		}
	},
	"problem_1" : {
		"switch": {

			//neutral
			"n1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			"line1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},

			//contacts
			"c2": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},
			"c3": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			
			//switch
			"spst1": {"on": true},
			"sc1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"sc2": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//wires
			"w1": {"Amps": 1.2},
			"w2": {"Amps": 1.2},
			"w3": {"Amps": 1.2},
			"w4": {"Amps": 1.2},
			"w5": {"Amps": 1.2},

			//light
			"l1": {"on": false},
			"l2": {"on": true},
			"l3": {"on": true},
			"lc1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"lc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//heater
			"heat1": {"on": true},
			"heat2": {"on": false},
			"heat3": {"on": false}


		},
		"noswitch": {
			//neutral
			"n1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
			"line1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},

			//contacts
			"c2": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": ''},
			"c3": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": ''},
						
			//switch
			"spst1": {"on": false},
			"sc1": {"Volts": "l1", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"sc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//wires
			"w1": {"Amps": 0},
			"w2": {"Amps": 0},
			"w3": {"Amps": 0},
			"w4": {"Amps": 0},
			"w5": {"Amps": 0},

			//light
			"l1": {"on": false},
			"l2": {"on": false},
			"lc1": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},
			"lc2": {"Volts": "g", "Ohms": 14, "Ferads": '', "Device": 'ss'},

			//heater
			"heat1": {"on": false},
			"heat2": {"on": true},
			"heat3": {"on": true}
			
		}
	}
};

*/