function Client(rpc) {
  this.rpc = rpc;
}

Client.prototype.getJob = function (argv, done) {
  var opts = {name: 'wssh'};
  this.rpc.getJob(opts, null, done);
};

Client.prototype.queueJob = function (argv, done) {
  this.rpc.queueJob(null, null, done);
};

Client.prototype.getJobs = function (argv, done) {
  this.rpc.getJobs(null, null, done);
};

Client.prototype.stopJob = function (argv, done) {
  this.rpc.stopJob(null, null, done);
};

module.exports = Client;
