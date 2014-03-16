#!/usr/bin/env node

var Http = require('http');

var RPC  = require('lib-http-rpc');
var argv = require('minimist')(process.argv.slice(2));

var Init = require('./index.js')();
var api  = require('./api.js');

function Client(rpc) {
  this.rpc = rpc;
}

Client.prototype.getJob = function (argv) {
  var opts = {name: 'wssh'};
  this.rpc.getJob(opts, null, function (err, res) {
    console.log('GETJOB', res);
  });
};

Client.prototype.queueJob = function (argv) {
  this.rpc.queueJob(null, null, function (err, res) {
    console.log('OKAY', err, res);
  });
};

Client.prototype.getJobs = function () {
  this.rpc.getJobs(null, null, function (err, res) {
    console.log(res);
  });
};

Client.prototype.stopJob = function () {
  this.rpc.stopJob(null, null, function (err, res) {
    console.log(err, res);
  });
};

var rpc = new RPC(api).getClient('localhost', 8080);
var cli = new Client(rpc);

var cmd = argv._.shift();
var run = cli[cmd];

if (run) {
  run.call(cli, argv);
} else {
  console.log("Unknown Command", cmd);
}
