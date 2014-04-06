# init lib

> job init server

## install

```bash
npm install --save lib-init
```

## usage

### queue a series of tasks

Spawn a series of tasks executed sequentially.
The `stdout/stderr` of each child is wired together in
`job.stdout` and `job.stderr` respectively.

```javascript
var Init = require('lib-init')();
var init = Init.New();

var job  = init.queue('myTask', {
  tasks: [task0, task1, task2]
})

job.stdout.pipe(process.stdout);
```

### abort a job

```javascript
var Init = require('lib-init')();
var init = Init.New();

init.queue('myTask', {
  tasks: [task0, task1, task2]
});

init.abortJob('myTask');
```
