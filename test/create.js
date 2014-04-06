var test = require('tap').test;

var assert = require('assert');
var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

var Init = require('../index.js')()

test("create a job requires name", function (t) {
  var init = Init.New();

  t.throws(function(){
    var job = init.queueJob();
  }, new assert.AssertionError({message: 'Job Requires Name'}));

  t.end();
});

test("create a job requires job object", function (t) {
  var init = Init.New();

  t.throws(function(){
    var job = init.queueJob('a');
  }, new assert.AssertionError({message: 'Job Requires Description'}));

  t.end();
});

test("job emits empty event", function (t) {
  t.plan(1);
  var init = Init.New();

  var job = init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()}
    ]
  });

  job.on('empty', function () {
    t.ok(true, 'emit an empty event');
  })

});


test("job emits empty event *only* after queue empties", function (t) {
  t.plan(3);
  var init = Init.New();

  var job = init.queueJob('a', {
    tasks: [
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
      {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
    ]
  });

  job.on('empty', function () {
    t.ok(true, 'emit an empty event');
  })

  var i = 0;
  job.queue.emitter.on('exit', function (){
    t.ok(true);
    if (++i == 2) t.end();
  })

});

test("queue after empty", function (t) {
  t.plan(2);
  var init = Init.New();
  var job;

  function queue() {
    job = init.queueJob('a', {
      tasks: [
        {exec: process.argv[0], args: ['-v'], envs: process.env, cwd: process.cwd()},
      ]
    });
  }

  queue();

  var i = 0;
  job.on('empty', function () {
    if (++i < 2) queue();
  })

  job.queue.emitter.on('exit', function (){
    t.ok(true);
  })
});
