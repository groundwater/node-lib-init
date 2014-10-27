var test = require('tap').test
var Init = require('../index.js')()

test('abort', function(t){
  t.plan(1)

  var init = Init.New()
  var task = {
    exec: process.argv[0],
    args: ['-e', 'console.log("hi")'],
    envs: process.env,
    cwd : process.cwd()
  }

  init.queue('test', task)
  .emitter
  .on('task', function() { t.ok(false, 'initial task was aborted') })

  t.ok(true, 'immediately abort the first job')
  init.abort('test')

  init.queue('test', task)
  .emitter
  .on('task', function() { t.ok(true, 'second task should run')})

})
