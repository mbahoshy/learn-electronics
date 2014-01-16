var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var questionSchema = new mongoose.Schema({

});

var Question = mongoose.model('Questions', questionSchema, 'Questions');
module.exports = Question;