var path = require("path"),
	express = require("express"),
    _ = require("underscore");


var mongoose = require('mongoose');
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

    res.sendfile('pages/hvac.html');
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
		console.log(id);
	} else {
		
		req.session.userid = id;
		console.log(req.session.userid);
		
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

function returnSlides (req, res) {
	var id = req.param("id");
	req.session.slideid = id;
	res.sendfile('./slides/' + id + '.html');
}

function slideTemplate (req, res) {
	res.sendfile('./templates/slidetemplate.html');
}

function getNav (req, res) {
	var type = req.param("type");
	res.send(req.session[type]);
}

exports.getClassroom = getClassroom;
exports.getClass = getClass;
exports.getUser = getUser;
exports.returnJson = returnJson;
exports.returnSlides = returnSlides;
exports.slideTemplate = slideTemplate;
exports.getNav = getNav;


var MainDB = [
	{classroomid: "0", name:"HVAC", snippet:"Become a service technician", chapters:[
		{chapterid:"0", active:true, name:"The Basics", snippet:"Volts, Amps, and Ohms - an introduction", lessons: [
			{lessonid:"0", active:true, name:"Chapter 1 Lesson 1", snippet:"Volts, Amps, and Ohms - an introduction", slides:"cl0_ch0_l0"},
			{lessonid:"1", active:false, name:"Chapter 1 Lesson 2", snippet:"Learn how Volts, Amps, and Ohms work together", slides:"cl0_ch0_l1"},
			{lessonid:"2", active:false, name:"Chapter 1 Lesson 3", snippet:"Swithes and Relays - an introduction", slides:"cl0_ch0_l2"}
		]},
		{chapterid:"1", active:false, name:"Putting It Together", snippet:"Learn how Volts, Amps, and Ohms work together", lessons:[
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