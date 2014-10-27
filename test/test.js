var test = require('tap').test
var Init = require('../index.js')()

test('happy path', function(t){
  t.plan(7)

  var init = Init.New()
  var task = {
    exec: process.argv[0],
    args: ['-e', 'console.log("hi")'],
    envs: process.env,
    cwd : process.cwd()
  }

  init.queue('test', task)
  .emitter
  .on('task', function(k){ t.ok(k, 'Task Started') })
  .on('exit', function(x){ t.ok(x, 'Task Exited') })
  .on('end',  function(){
    t.deepEquals(init.tasks('test').results, [{code: 0, signal: null}], 'job exited successfully')
    t.deepEquals(init.tasks('test').pending, [], 'there are no more queued jobs')
    t.end()
  })

  var queues = init.queues()

  t.deepEquals(queues, ['test'])

  queues.forEach(function(name) {
    var tasks = init.tasks(name)

    console.log('Pending', tasks)

    t.deepEquals(tasks.results, [], 'results are empty')
    t.deepEquals(tasks.pending, [task], 'job is pending')
  })
})
