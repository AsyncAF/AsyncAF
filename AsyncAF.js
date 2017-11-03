// const mapAF = require('./mapAF');

// class AsyncAF {
//   constructor(promises) {
//     this.promise = Promise.resolve(promises);
//   }
//   then(resolve, reject) {
//     return new AsyncAF(this.promise.then(resolve, reject));
//   }
//   catch(reject) {
//     return this.then(null, reject);
//   }
//   mapAF(fn) {
//     return this.then(array => Promise.all(array.map(fn)));
//   }
// }

const AsyncAF = function AsyncAF(promises) {
  if (!(this instanceof AsyncAF)) return new AsyncAF(promises);
  this.promise = Promise.resolve(promises);
  this.then = function thenAF(resolve, reject) {
    return new AsyncAF(this.promise.then(resolve, reject));
  };
  this.catch = function catchAF(reject) {
    return this.then(null, reject);
  };
  this.mapAF = function mapAF(fn) {
    return this.then(array => Promise.all(array.map(fn)));
  };
  return this;
};

module.exports = AsyncAF;
