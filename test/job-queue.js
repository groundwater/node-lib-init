var test   = require('tap').test;
var assert = require('assert');
var Init   = require('../server.js')();
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
    t.ifError(err);
    init.waitJob({name: 'test'}, null, function (err) {
      t.ifError(err);
    });
  });

});

test('double queue a job', function (t) {
  t.plan(2);

  // double add
  init.queueJob({name: 'test'}, job, function (err, res) {
    t.ifError(err);
  });

  init.queueJob({name: 'test'}, job, function (err, res) {
    t.ifError(err);
  });

});
