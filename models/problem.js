var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var problemSchema = new mongoose.Schema({

});

var Problem = mongoose.model('Problems', problemSchema, 'Problems');
module.exports = Problem;