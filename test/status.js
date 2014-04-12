var test = require('tap').test;

var nodemock = require('nodemock');
var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

test("get job status", function (t) {
  var pending = [{name: 'a'},{name: 'b'}];
  var results = [{name: 'c'},{name: 'd'}];
  var queue = {
    pending: pending,
    running: true,
    results: results,
  };

  var job = new (require('../index.js').Job)();
  job.queue = queue;

  var stat = job.status();

  t.ok(stat);
  t.deepEquals(stat.pending, pending);
  t.deepEquals(stat.running, true);
  t.deepEquals(stat.results, results);
  t.end();
});
