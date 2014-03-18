var test   = require('tap').test;
var assert = require('assert');
var Init   = require('../init.js')();
var init   = Init.New();

test('when clearing a job badly', function (t) {
  t.plan(1);
  t.throws(function () {
    init.clearJob({}, null, function () {});
  }, new assert.AssertionError({message: 'must specify name'}));
});

test('when clearing a job', function (t) {
  t.plan(4);

  var job = {
    tasks: [{
      exec: process.argv[0],
      args: ['-v'],
      envs: process.env
    }]
  };

  // queue a job
  init.queueJob({name: 'test'}, job, function (err, res) {
    t.ifError(err, 'queue should work');

    init.stopJob({name: 'test'}, null, function (err, res) {
      t.ifError(err, 'stop works');

      init.clearJob({name: 'test'}, null, function (err) {
        t.ifError(err, 'stopping should work');

        init.getJobs(null, null, function (err, res) {
          t.equal(res.length, 0);
          t.end();
        })

      });
    });

  });

});
