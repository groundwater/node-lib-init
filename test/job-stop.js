var test   = require('tap').test;
var assert = require('assert');
var Init   = require('../init.js')();
var init   = Init.New();

var job = {
  tasks: [{
    exec: process.argv[0],
    args: ['-e', 'setTimeout(function(){}, 110000)'],
    envs: process.env
  }]
};

test('stop a job', function (t) {
  t.plan(3);

  init.queueJob({name: 'test'}, job, function (err, res) {
    t.ifError(err);
    init.stopJob({name: 'test'}, null, function (err) {
      t.ifError(err);
    });
    init.waitJob({name: 'test'}, null, function (err) {
      t.ifError(err);
    })
  });

});
