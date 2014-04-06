var test = require('tap').test;

var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

var Init = require('../index.js')()

test("one slow", function (t) {
  var init = Init.New();
  var job = init.queue('a', {
    tasks: []
  });

  setTimeout(function () {
    init.queue('a', {
      tasks: [
        {exec: process.argv[0], args: ['-e', 'process.stdout.write("one");'], envs: process.env, cwd: process.cwd()},
      ]
    });
  }, 100)

  job.queue.emitter.on('exit', function(){
    init.abortJob('a');
  })

  solidify(job.stdout).text(function (e, txt) {
    t.equal(txt, "one");
    t.end();
  });
});

test("two slow", function (t) {
  var init = Init.New();
  var job = init.queue('a', {
    tasks: []
  });

  setTimeout(function () {
    init.queue('a', {
      tasks: [
        {exec: process.argv[0], args: ['-e', 'process.stdout.write("one");'], envs: process.env, cwd: process.cwd()},
      ]
    });
  }, 100)

  setTimeout(function () {
    init.queue('a', {
      tasks: [
        {exec: process.argv[0], args: ['-e', 'process.stdout.write("two");'], envs: process.env, cwd: process.cwd()},
      ]
    });
  }, 200)

  var i = 0;

  job.queue.emitter.on('exit', function(){
    if (++i == 2) init.abortJob('a');
  });

  solidify(job.stdout).text(function (e, txt) {
    t.equal(txt, "onetwo");
    t.end();
  });
});
