var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');
var Series   = require('lib-stream-series');

var Init = require('../index.js')()
var init = Init.New();

// var job = init.queueJob('a', {
//   tasks: [
//     {exec: process.argv[0], args: ['-e', 'console.log("one");'], envs: process.env, cwd: process.cwd()},
//     {exec: process.argv[0], args: ['-e', 'console.log("two");'], envs: process.env, cwd: process.cwd()},
//     {exec: process.argv[0], args: ['-e', 'console.log("thr");'], envs: process.env, cwd: process.cwd()},
//     {exec: process.argv[0], args: ['-e', 'console.log("for");'], envs: process.env, cwd: process.cwd()},
//     {exec: process.argv[0], args: ['-e', 'console.log("fiv");'], envs: process.env, cwd: process.cwd()},
//   ]
// });

var job = init.queueJob('a', {
  tasks: [
    {exec: 'echo', args: ['one'], envs: process.env, cwd: process.cwd()},
    {exec: 'echo', args: ['two'], envs: process.env, cwd: process.cwd()},
    {exec: 'echo', args: ['thr'], envs: process.env, cwd: process.cwd()},
    {exec: 'echo', args: ['for'], envs: process.env, cwd: process.cwd()},
    {exec: 'echo', args: ['fiv'], envs: process.env, cwd: process.cwd()},
  ]
});

job.stdout.pipe(process.stdout)
// job.queue.emitter.on('task', function (proc) {
//   proc.stdout.pipe(process.stdout);
// })
