#!/bin/env node

// DEPS
var express = require('express')
var bodyParser = require('body-parser')
var tabuliser = require(__dirname + '/app')

///////////////
/// Config
///////////////
var App = function() {
    this.server = express();

	this.server.use(bodyParser.urlencoded({ extended: true }));
	this.server.use(bodyParser.json());

    // API
    this.server.post('/csv_download', function(req, res) {
		var data = req.body;
        tabuliser.json2csv(data, res);
    });

    // Frontend
    this.server.use(express.static(__dirname + '/../client'));
}
App.prototype.start = function() {
    var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
    var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
    this.server.listen(port, ipaddress);
    console.log((new Date()) + ': Magic happens at ' + ipaddress + ":" + port);
}

///////////////
/// Fire it up
///////////////
var BoomPPC = new App();
BoomPPC.start();
