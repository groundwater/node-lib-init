var test = require('tap').test;

var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

var Init = require('../index.js')()

test("get a job", function (t) {
  var init = Init.New();

  var job = init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  var job = init.getJob('a');
  job.on('empty', function(){
    t.ok(true)
    t.end();
  })
});


test("get a job requires valid name", function (t) {
  var init = Init.New();

  var job = init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  t.throws(function (){
    var job = init.getJob();
  }, new Error('Job Must Have Name'))
  t.end()
});

test("list jobs", function (t) {
  var init = Init.New();

  init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  init.queueJob('b', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  t.deepEquals(init.listJobs(), ['a', 'b']);
  t.end()
});
