var Http = require('http');
var spawn= require('child_process').spawn;
var RPC  = require('lib-http-rpc');
var argv = require('minimist')(process.argv.slice(2));

var Init = require('./init.js')();
var api  = require('./api.js');

var PORT = argv.port || argv.p || process.env.PORT || 8080;
var HOST = argv.host || argv.h || process.env.HOST || 'localhost';
var BOOT = argv.boot || argv.b || process.env.BOOT || false;

var init = Init.New();
var router = new RPC(api).getRouter(init);

var server = Http.createServer(router);

server.listen(PORT, HOST, firstRunner);

function firstRunner() {
  console.log('Init Listening on %s:%s', HOST, PORT);
  var args = argv._;

  if (args.length === 0)
    return console.log('No First Runner');

  // drop -- in command line
  if(args[0] === '--') args.shift();

  var exec = args.shift();
  var args = args;
  var opts = {
    env: process.env,
    cwd: '/',
    stdio: 'inherit'
  };

  var first = spawn(exec, args, opts);

  first.on('exit', function (code, signal) {
    var bad = code !== 0;
    if (bad) {
      console.error('First Runner Failed');
      return process.exit(1);
    }

    if (BOOT) return;

    console.log('First Runner Exited in Non-Boot Mode');
    server.close();
  });
}
