var Http = require('http');

var RPC  = require('lib-http-rpc');

var Init = require('./index.js')();
var api  = require('./api.js');

var init = Init.New();
var router = new RPC(api).getRouter(init);

var server = Http.createServer(router);

server.listen(8080, function () {
  console.log('Init Started');
});
