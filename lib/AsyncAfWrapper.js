import value from './methods/other/value';
import use from './methods/other/use';

class AsyncAfWrapperProto {}

class AsyncAfWrapper extends AsyncAfWrapperProto {
  constructor(promises) {
    super();
    this.innerVal = promises;
  }
}

const AsyncAfCreator = AsyncAfWrapper;
// eslint-disable-next-line no-class-assign, no-shadow
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
