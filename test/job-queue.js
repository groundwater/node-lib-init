var test   = require('tap').test;
var assert = require('assert');
var Init   = require('../init.js')();
var init   = Init.New();

var job = {
  tasks: [{
    exec: process.argv[0],
    args: ['-v'],
    envs: process.env
  }]
};

test('basic job queue', function (t) {
  t.plan(2);

  // queue a job
  init.queueJob({name: 'test'}, job, function (err, res) {
    t.ifError(err, 'queue should work');
    init.waitJob({name: 'test'}, null, function (err) {
      t.ifError(err, 'wait on job works');
    });
  });

});

test('when double queueing', function (t) {
  t.plan(3);

  // double add
  init.queueJob({name: 'test'}, job, function (err, res) {
    t.ifError(err, 'first queue should work');
  });

  init.queueJob({name: 'test'}, job, function (err, res) {
    t.ifError(err, 'second queue should work');
  });

  init.waitJob({name: 'test'}, null, function (err, res) {
    t.ifError(err, 'wait should only happen once');
  })
});
