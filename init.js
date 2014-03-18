var events = require('events');
var assert = require('assert');

function Init(require) {
  this.require = require;
  this.jobs    = {};
}

function getOrMakeJob(init, name) {
  var job = init.jobs[name];

  if (!job) job = init.require.Job.New();
  init.jobs[name] = job;

  return job;
}

/*

  Queue a New Job

  Create a new job, or add a series of tasks to an existing job.
  Tasks are always run in-order, waiting for the previous to exit before
  starting the next task.

  Tasks are a simple way to handle job setup and exit criteria.

  Tasks are not meant to be complex, or parallel process control.
  Most jobs will have one to three tasks, including a setup task,
  the main task, and a cleanup task.

  The cleanup task can also requeue the job in the event of a crash
  or undesired exit.

*/

Init.prototype.queueJob = function (opts, body, done) {
  var name = opts.name;
  var job  = getOrMakeJob(this, name);

  assert(name, 'must specify name');
  assert(body, 'must specify body');
  assert(body.tasks, 'must specify list of tasks');

  body.tasks.forEach(function (task) {
    job.queue(task);
  });

  done();
};

Init.prototype.getJobs = function (opts, body, done) {
  done(null, Object.keys(this.jobs));
};

Init.prototype.getJob = function (opts, body, done) {
  var name = opts.name;
  done(null, this.jobs[name]);
};

Init.prototype.waitJob = function (opts, body, done) {
  var name = opts.name;
  var job  = this.jobs[name];

  if (job) job.emitter.on('end', done);
  else done();
};

Init.prototype.stopJob = function (opts, body, done) {
  var name = opts.name;
  var job  = this.jobs[name];

  if (job) job.abort();

  done(null);
};

Init.New = function () {
  return new Init(this);
}

/*

  Injectors

*/

function inject(deps) {
  return Object.create(Init, deps);
}

function defaults() {
  var deps = {
    Spawn: {
      value: require('child_process').spawn
    },
    Job: {
      value: require('lib-job-queue')()
    }
  };
  return inject(deps);
}

/*

  Initializer

*/

module.exports = function INIT(deps) {
  if (typeof deps === 'object') return inject(deps);
  else if (deps === undefined)  return defaults();
  else                          throw new Error('injection error');
};
