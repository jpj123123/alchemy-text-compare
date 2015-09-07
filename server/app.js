var _ = require('lodash')
var request = require('request')
var json2csv = require('json2csv')

///////////////
/// Functions
///////////////

var app = {
    json2csv: function(req,res) {
		return json2csv(req, function(err, csv) {
			res.type('csv');
	        res.send(csv);
		});
    }
}

module.exports = app;
