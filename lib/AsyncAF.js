import {AsyncAfWrapperProto as AsyncAfProto} from './AsyncAfWrapper';

import logAF from './methods/other/logAF';
import forEachAF from './methods/combined/forEachAF';
import mapAF from './methods/combined/mapAF';
import filterAF from './methods/combined/filterAF';

class AsyncAF extends AsyncAfProto {
  constructor(promises) {
    super();
    this.innerVal = promises;
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

AsyncAfProto.logAF = logAF;

AsyncAfProto.prototype.forEachAF = forEachAF;

AsyncAfProto.prototype.mapAF = mapAF;

AsyncAfProto.prototype.filterAF = filterAF;

export default AsyncAF;
