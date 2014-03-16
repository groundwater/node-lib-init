
function Routes(require) {
  this.require = require;
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
Routes.prototype.queueJob = function (opts, body, done) {
  done();
};

Routes.prototype.getJobs = function (opts, body, done) {
  done(null, [
    'level_dns',
    'wssh'
  ]);
};

Routes.prototype.getJob = function (opts, body, done) {
  done(null, {
    name: 'wssh',
    status: 'running'
  });
};

Routes.prototype.stopJob = function (opts, body, done) {
  done(null);
};

Routes.New = function () {
  return new Routes(this);
}

/*

  Injectors

*/

function inject(deps) {
  return Object.create(Routes, deps);
}

function defaults() {
  var deps = {
    Spawn: {
      value: require('child_process').spawn
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
