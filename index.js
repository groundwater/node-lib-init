'use strict';

/*jshint -W058 */

var assert = require('assert');

var events = require('events');
var util   = require('util');

util.inherits(Job, events.EventEmitter);
function Job(opts) {
  events.EventEmitter.call(this, opts);

  // this is just used to keep track if there are pending jobs
  this.tasks  = [];

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

  // each tasks stdio is piped to an aggregate stream
  queue.emitter.on('task', function (proc) {
    stdout.addReadable(proc.stdout);
    stderr.addReadable(proc.stderr);
  });

  // when the queue is *done* done, end the aggregate stream

  var job = new Job();

  job.queue  = queue;
  job.stdout = stdout;
  job.stderr = stderr;

  queue.emitter.on('exit', function () {
    // emit an event when there are no jobs on the queue
    job.tasks.shift();
    if (job.tasks.length === 0) job.emit('empty');
  });

  return job;
}

Init.prototype.clearJob = function (name) {
  var job = this.jobs[name];

  if (!job)              throw new Error('Job Not Found');
  if (job.queue.running) throw new Error('Cannot Clear a Running Job');

  delete this.jobs[name];
};

Init.prototype.queueJob = function (name, body) {
  assert(name, 'Job Requires Name');
  assert(body, 'Job Requires Description');

  var types = this.$.types;
  var job   = this.jobs[name] || createJob(this, name);

  body = types.job.marshal(body);

  if (!job.queue.running) throw new Error('Job Aborted');

  body.tasks.forEach(function (task) {
    job.queue.queue(task); // enque task for running
    job.tasks.push(task);  // keep track of how many jobs we have
  });

  this.jobs[name] = job;

  return job;
};

Init.prototype.abortJob = function (name) {
  // assert(name, 'require name');
  // if (!this.jobs[name]) throw New Error('Job does not exist');
  var job = this.jobs[name];

  job.queue.abort();
  job.stdout.done();
  job.stderr.done();
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
