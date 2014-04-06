module.exports = {

  // get a list of jobs
  getJobs: {
    method: 'GET',
    route: '/jobs'
  },

  getJob: {
    method: 'GET',
    route: '/job/:name'
  },

  waitJob: {
    method: 'GET',
    route: '/job/:name/wait'
  },

  // queue a new job
  // or add tasks to an existing job
  queueTasks: {
    method: 'POST',
    route: '/job/:name'
  },

  // delete the entire job
  clearJob: {
    method: 'DELETE',
    route: '/job/:name'
  },

  streamJob: {
    method: 'GET',
    route: '/job/:name/stream',
    options: {
      'fd': 'stdout+stderr'
    }
  },

  // stop a job
  // kill the current task,
  // and drop all extra tasks
  stopJob: {
    method: 'POST',
    route: '/job/:name/stop'
  },

  // get a task properties
  getTask: {
    method: 'GET',
    route: '/job/:name/task/:id'
  },

  // get a list of all tasks
  getTasks: {
    method: 'GET',
    route: '/job/:name/tasks'
  },

  // signal a task
  signalTask: {
    method: 'POST',
    route: '/job/:name/task/:id/sig/:signal'
  }

};
