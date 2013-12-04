var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var navSchema = new mongoose.Schema({

});

var Nav = mongoose.model('NavData', navSchema, 'NavData');
module.exports = Nav;