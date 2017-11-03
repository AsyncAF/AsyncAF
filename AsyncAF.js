class AsyncAF {
  constructor(promises) {
    this.promise = Promise.resolve(promises);
  }
  then(resolve, reject) {
    return new AsyncAF(this.promise.then(resolve, reject));
  }
  catch(reject) {
    return this.then(null, reject);
  }
  mapAF(fn) {
    return this.then(array => Promise.all(array.map(fn)));
  }
}

module.exports = AsyncAF;
