var test = require('tap').test;

var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

var Init = require('../index.js')()

test("one slow", function (t) {
  var init = Init.New();

  var job = init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-e', 'process.stdout.write("one");'], envs: process.env, cwd: process.cwd()},
    ]
  });

  init.abortJob('a');

  t.throws(function () {
    init.queueJob('a', {
      tasks: [
        {exec: process.argv[0], args: ['-e', 'process.stdout.write("one");'], envs: process.env, cwd: process.cwd()},
      ]
    });
  }, new Error('Job Aborted'));

  t.end();
});
