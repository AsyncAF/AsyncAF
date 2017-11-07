const AsyncAF = function AsyncAF(promises) {
  if (!(this instanceof AsyncAF)) return new AsyncAF(promises);
  this.promise = Promise.resolve(promises);
  return this;
};

AsyncAF.prototype.then = function thenAF(resolve, reject) {
  return new AsyncAF(this.promise.then(resolve, reject));
};

AsyncAF.prototype.catch = function catchAF(reject) {
  return this.then(null, reject);
};

AsyncAF.prototype.mapAF = require('./mapAF');

AsyncAF.prototype.filterAF = require('./filterAF');

module.exports = AsyncAF;
