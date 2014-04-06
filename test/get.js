var test = require('tap').test;

var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

var Init = require('../index.js')()

test("get a job", function (t) {
  var init = Init.New();

  var job = init.queue('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  var job = init.get('a');
  job.on('empty', function(){
    t.ok(true)
    t.end();
  })
});


test("get a job requires valid name", function (t) {
  var init = Init.New();

  var job = init.queue('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  t.throws(function (){
    var job = init.get();
  }, new Error('Job Must Have Name'))
  t.end()
});

test("list jobs", function (t) {
  var init = Init.New();

  init.queue('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  init.queue('b', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  t.deepEquals(init.list(), ['a', 'b']);
  t.end()
});
