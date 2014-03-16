var assert = require('assert');

var okay = false;
var deps = {
  Spawn: {
    value: function (exec, args, opts) {

    }
  }
};

var Routes = require('../index.js')(deps);
var routes = Routes.New();


var task = {
  exec: "node",
  args: ["server.js"],
  envs: {
    PORT: 2121
  },
  cwd: "/home/root/lib/node_modules/test",
  uid: 20,
  gid: 20
};

var job = {
  tasks: [
    task
  ]
};

routes.queueJob(null, job, function (err, ticket) {
  console.log('ok');
});
