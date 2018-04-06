import forEachAF from './forEachAF';

const mapAF = function mapAF(callback, thisArg) {
  // return new (this.constructor)(this.value().map(fn));
  // const wrapAndMap = unwrapped => new (this.constructor)(unwrapped.map(fn));
  // const that = this;
  // return Promise.all(that.value()).then(wrapAndMap);
  // const that = this;

  // const resolved = Promise.all(this.value());
  // // console.log('constructor', this.constructor);
  // const result = new (this.constructor)(resolved.map(fn));
  // return new (this.constructor)(resolved.map(fn));
  // return result;

  // const resolved = Promise.all(this.value());
  // const result = yield resolved.map(fn);
  // return new (this.constructor)(result);

  // return Promise.all(this.value()).then(resolved => {
  //   return new (this.constructor)(resolved.map(fn));
  // });
  // console.log(/*new (that.constructor)*/(Promise.all(that.value()).then(resolved => resolved.map(fn))));

  // const that = this;
  // return new (that.constructor)(await Promise.all(that.getValue()).then(resolved => resolved.map(fn)));

  // const mapped = await this.getValue().reduce((resolved, item) => {
  //   return resolved.then(prev => [...prev, fn(item)]);
  // }, Promise.resolve([]));
  // return new (this.constructor)(mapped);

  // const values = this.value().map(fn);
  // return new (this.constructor)(values);

  // const mapped = await Promise.all(this.value()).then(arr => {
  //   arr.map(callback, thisArg);
  // });
  // return new (this.constructor)(mapped);
  // this.constructor.use({forEachAF});

  if (typeof this.constructor.forEachAF !== 'function') {
    this.constructor.use({forEachAF});
  }
  const mapped = [];
  // await this.forEachAF(function(currentValue, index, array) {
  //   mapped.push(callback(currentValue, index, array));
  // }, thisArg);
  // return new (this.constructor)(mapped);

  return this.forEachAF(function(currentValue, index, array) {
    mapped.push(callback(currentValue, index, array));
  }, thisArg).then(() => new (this.constructor)(mapped));
};

export default mapAF;
