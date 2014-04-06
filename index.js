var assert = require('assert');

var solidify = require('lib-stream-solidify');
var liquify  = require('lib-stream-liquify');

function Job() {
  this.queue  = null;
  this.stdout = null;
  this.stderr = null;
}

function Init() {
  this.jobs = {};
}

function createJob(init, name) {
  var queue  = init.$.Queue.New();

  var stdout = init.$.Stream();
  var stderr = init.$.Stream();

  queue.emitter.on('task', function (proc) {
    stdout.addReadable(proc.stdout);
    // stderr.addReadable(proc.stderr);
  });

  var job = new Job();

  job.queue  = queue;
  job.stdout = stdout;
  job.stderr = stderr;

  return job;
}

Init.prototype.queueJob = function (name, body) {
  // assert(name, 'require name of job');
  // assert(body, 'require body containing job description');

  var types = this.$.types;
  var job   = this.jobs[name] || createJob(this, name);
  var body  = types.job.marshal(body);

  body.tasks.forEach(function (task) {
    job.queue.queue(task);
  });

  this.jobs[name] = job;

  return job;
};

Init.prototype.abortJob = function (name) {
  // assert(name, 'require name');
  // if (!this.jobs[name]) throw New Error('Job does not exist');

  this.jobs[name].abort();
};

Init.New = function () {
  return Object.defineProperty(new Init, '$', {value: this});
};

/*

  Injectors

*/

function inject(deps) {
  return Object.create(Init, deps);
}

function defaults() {
  return {
    types: {
      value: require('lib-proto-job')
    },
    Queue: {
      value: require('lib-job-queue')()
    },
    Stream: {
      value: require('lib-stream-series')
    }
  };
}

/*

  Initializer

*/

module.exports = function INIT(deps) {
  return inject(deps || defaults());
};
