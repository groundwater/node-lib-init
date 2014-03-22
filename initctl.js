#!/usr/bin/env node

var Http   = require('http');
var join   = require('path').join;
var fs     = require('fs');

var RPC    = require('lib-http-rpc');
var argv   = require('minimist')(process.argv.slice(2));

var api    = require('./api.js');

var PORT   = argv.port || argv.p || process.env.PORT || 8080;
var HOST   = argv.host || argv.h || process.env.HOST || 'localhost';

var rpc    = new RPC(api).getClient(HOST, PORT);

var cmd    = argv._.shift();

if (!cmd) {
  fs.createReadStream(join(__dirname, 'usage.txt')).pipe(process.stdout);
  return;
}

if (cmd==='run') {
  var exec = argv._.shift();
  var args = argv._;

  var job = {
    tasks: [{
      exec: exec,
      args: args,
      envs: process.env,
      cwd: process.cwd(),
    }]
  };

  var opt = {
    name: 'cli'
  };
  rpc.queueJob(opt, job, function (err, res) {
    console.log(err, res);
  });

} else {
  console.log('Unknown Command');
}
