var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var testSchema = new mongoose.Schema({

});

var Test = mongoose.model('Tests', testSchema, 'Tests');
module.exports = Test;