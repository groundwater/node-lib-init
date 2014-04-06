var test = require('tap').test;

var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

var Init = require('../index.js')()
var init = Init.New();

test("happy path test", function (t) {
  t.plan(3);

  var job = init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-e', 'process.stdout.write("one");'], envs: process.env, cwd: process.cwd()},
      {exec: process.argv[0], args: ['-e', 'process.stdout.write("two");'], envs: process.env, cwd: process.cwd()},
      {exec: process.argv[0], args: ['-e', 'process.stdout.write("thr");'], envs: process.env, cwd: process.cwd()},
      {exec: process.argv[0], args: ['-e', 'process.stdout.write("for");'], envs: process.env, cwd: process.cwd()},
      {exec: process.argv[0], args: ['-e', 'process.stdout.write("fiv");'], envs: process.env, cwd: process.cwd()},
    ]
  });

  // 
  solidify(job.stdout).text(function (e, txt) {
    t.equal(txt, "onetwothrforfiv");
    t.end();
  });

  // stream doesn't end until we abort
  var i=0;
  job.queue.emitter.on('exit', function () {
    if (++i == 5) init.abortJob('a');
    t.ok(true);
  })
});
