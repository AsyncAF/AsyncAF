import {AsyncAfWrapperProto as AsyncAfProto} from './AsyncAfWrapper';

import logAF from './methods/other/logAF';
import forEachAF from './methods/arrays/forEachAF';
import mapAF from './methods/arrays/mapAF';
import filterAF from './methods/arrays/filterAF';

class AsyncAF extends AsyncAfProto {}

const AsyncAfCreator = AsyncAF;
// eslint-disable-next-line no-class-assign
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
