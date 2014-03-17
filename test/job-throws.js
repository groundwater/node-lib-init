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

test('throw on bad request', function (t) {

  // queue a job
  t.throws(function () {
    init.queueJob({name: 'test'}, job);
  });

  t.throws(function () {
    init.queueJob({name: 'test'}, null, function() {});
  }, new assert.AssertionError({message: 'must specify body'}))

  t.throws(function () {
    init.queueJob({name: 'test'}, {}, function() {});
  }, new assert.AssertionError({message: 'must specify list of tasks'}))

  t.throws(function () {
    init.queueJob({}, {tasks:[]}, function() {});
  }, new assert.AssertionError({message: 'must specify name'}));

  t.end();
});
