var mongoose = require('mongoose');

module.exports = function () {

	var MONGOHQ_URL = 'mongodb://mbahoshy:07maryJ68@dharma.mongohq.com:10062/tradeTrainer';
	mongoose.connect(MONGOHQ_URL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  console.log('successfully connected to database!');
	});

}