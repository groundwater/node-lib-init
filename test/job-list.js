var test   = require('tap').test;
var assert = require('assert');
var Init   = require('../init.js')();
var init   = Init.New();

test('when listing an active job', function (t) {
  t.plan(4);

  var job = {
    tasks: [{
      exec: process.argv[0],
      args: ['-e', 'setTimeout(function(){}, 1000)'],
      envs: process.env
    }]
  };

  // queue a job
  init.queueJob({name: 'test'}, job, function (err, res) {
    t.ifError(err, 'queue should work');
    init.getJobs(null, null, function (err, res) {
      t.ifError(err, 'wait on job works');
      t.ok(res.length > 0, 'job list should be non-empty');
      var name = res.pop();
      init.stopJob({name: name}, null, function (err) {
        t.ifError(err, 'stopping should work')
      });
    });
  });

});

test('when listing an active job', function (t) {

  var job = {
    tasks: [{
      exec: process.argv[0],
      args: ['-v'],
      envs: process.env
    }]
  };

  // queue a job
  init.queueJob({name: 'test2'}, job, function (err, res) {
    t.ifError(err, 'queue should work');
    init.waitJob({name: 'test2'}, null, function (err, res) {
      t.ifError(err);
      init.getJobs(null, null, function (err, res) {
        t.ifError(err);
        t.ok(res.length > 0);
        t.end();
      })
    });
  });

});
