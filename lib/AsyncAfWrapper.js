import value from './methods/other/value';
import use from './methods/other/use';

class AsyncAfWrapperProto {
  constructor(data) {
    this.data = Promise[Array.isArray(data) ? 'all' : 'resolve'](data);
  }
  then(resolve, reject) {
    return new (this.constructor)(this.data.then(resolve, reject));
  }
  catch(reject) {
    return this.then(null, reject);
  }
}

class AsyncAfWrapper extends AsyncAfWrapperProto {}

const AsyncAfCreator = AsyncAfWrapper;
// eslint-disable-next-line no-class-assign
AsyncAfWrapper = function AsyncAfWrapper(...args) {
  return new AsyncAfCreator(...args);
};

AsyncAfWrapper.prototype = AsyncAfCreator.prototype;
Object.setPrototypeOf(AsyncAfWrapper, AsyncAfCreator);
AsyncAfWrapper.prototype.constructor = AsyncAfWrapper;

AsyncAfWrapperProto.prototype.value = value;
AsyncAfWrapperProto.use = use;

export {AsyncAfWrapperProto};
export default AsyncAfWrapper;
