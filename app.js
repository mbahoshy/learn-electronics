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


var port = process.env.PORT || 3000;
app.listen(port);
console.log("Started server on port " + port);