var _ = require('lodash')
var request = require('request')
var json2csv = require('json2csv')

///////////////
/// Functions
///////////////

var app = {
    json2csv: function(req,res) {
        console.log(req);
        res.send();
    }
}

module.exports = app;