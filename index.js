'use strict'

// var assert = require('assert')
//
var events = require('events')
// var util   = require('util')
//
// var check  = require('lib-checked-domain')()

function Job(opts) {
  // events.EventEmitter.call(this, opts)
  //
  // // this is just used to keep track if there are pending jobs
  // this.tasks  = []
  //
  // this.queue  = null
  // this.stdout = null
  // this.stderr = null
}

function Init() {
  this._queues = {}
  this.events  = null
}

Init.prototype.queue = function (name, task) {
  return getQueue(this, name).add(task)
}

/*
  Abort a queue, killing all tasks in the queue
*/
Init.prototype.abort = function (name) {
  getThenReplaceQueue(this, name).abort()
}

Init.prototype.queues = function () {
  return Object.keys(this._queues)
}

Init.prototype.tasks = function (name) {
  var q = getQueue(this, name)

  return {
    results: q.results,
    pending: q.pending
  }
}

Init.New = function () {
  var init = Object.defineProperty(new Init, '$', {value: this})

  init.events = new events.EventEmitter()

  return init
}

/*
  Private Functions
*/

// get the current queue, then replace it
function getThenReplaceQueue(init, name) {
  var queue = getQueue(init, name)

  init._queues[name] = init.$.NewQueue()

  return queue
}

// get an existing queue or initialize a new queue
function getQueue(init, name) {
  var queue = init._queues[name]
            ? init._queues[name]
            : init._queues[name] = init.$.NewQueue()
  return queue
}


/*

  Injectors

*/

function inject(deps) {
  return Object.create(Init, deps)
}

function defaults() {
  var Q = require('lib-job-queue')()
  return {
    types: {
      value: require('lib-proto-job')
    },
    NewQueue: {
      value: function(){
        return Q.New()
      }
    },
    Stream: {
      value: require('lib-stream-series')
    },
  }
}

/*

  Initializer

*/
module.exports = function INIT(deps) {
  return inject(deps || defaults())
}
module.exports.defaults = defaults
module.exports.Job = Job
