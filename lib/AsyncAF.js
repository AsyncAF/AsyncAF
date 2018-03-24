import mapAF from './methods/combined/mapAF';
import filterAF from './methods/combined/filterAF';
import logAF from './methods/other/logAF';

class AsyncAfProto {
  static logAF(...args) {
    return logAF(...`${args}`);
  }
}

class AsyncAF extends AsyncAfProto {
  constructor(promises) {
    super();
    this.value = null;
    if (promises instanceof Promise) {
      Promise.resolve(promises).then(resolved => {
        this.value = resolved;
      });
    }
    if (Array.isArray(promises)) {
      this.value = promises;
    }
  }
}

const AsyncAfCreator = AsyncAF;
// eslint-disable-next-line no-class-assign, no-shadow
AsyncAF = function AsyncAF(...args) {
  return new AsyncAfCreator(...args);
};

AsyncAF.prototype = AsyncAfCreator.prototype;
Object.setPrototypeOf(AsyncAF, AsyncAfCreator);
AsyncAF.prototype.constructor = AsyncAF;

AsyncAfProto.prototype.mapAF = mapAF;

AsyncAfProto.prototype.filterAF = filterAF;

export default AsyncAF;
