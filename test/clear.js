var test = require('tap').test;

var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

var Init = require('../index.js')()

test("clear a job", function (t) {
  var init = Init.New();

  var job = init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  init.abortJob('a');
  init.clearJob('a');

  init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  t.end();
});

test("cannot clear a running job", function (t) {
  var init = Init.New();

  var job = init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  t.throws(function () {
    init.clearJob('a');
  }, new Error('Cannot Clear a Running Job'))

  t.end();
});

test("cannot clear a nonexistent job", function (t) {
  var init = Init.New();

  t.throws(function () {
    init.clearJob('a');
  }, new Error('Job Not Found'))

  t.end();
});
