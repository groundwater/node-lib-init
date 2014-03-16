#!/usr/bin/env node

var Http = require('http');

var RPC  = require('lib-http-rpc');
var argv = require('minimist')(process.argv.slice(2));

var Init = require('./index.js')();
var api  = require('./api.js');

var Client = require('./client.js');

var rpc = new RPC(api).getClient('localhost', 8080);
var cli = new Client(rpc);

var cmd = argv._.shift();
var run = cli[cmd];

if (run) {
  run.call(cli, argv);
} else {
  console.log("Unknown Command", cmd);
}
