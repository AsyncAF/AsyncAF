import mapAF from './mapAF';
import filterAF from './filterAF';
import logAF from './logAF';

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

AsyncAF.prototype.mapAF = mapAF;

AsyncAF.prototype.filterAF = filterAF;

AsyncAF.logAF = logAF;

export default AsyncAF;
