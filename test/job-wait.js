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

test('wait on nonexistent job', function (t) {
  t.plan(1);

  // queue a job
  init.waitJob({name: 'something'}, null, function (err) {
    t.ifError(err, 'works even if job doesn\'t exist');
  });

});
