var path = require("path"),
    express = require("express");
    //_ = require("underscore");

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

app.get("/chapters", function(req, res){
	res.json(HVACChapters);
});


var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);


var HVACChapters = [
	{id:0, name:"The Basics", snippet:"Volts, Amps, and Ohms - an introduction", content:{}},
	{id:1, name:"Putting It Together", snippet:"Learn how Volts, Amps, and Ohms work together", content:{}},
	{id:2, name:"Switches and Relays", snippet:"Swithes and Relays - an introduction", content:{}}
];