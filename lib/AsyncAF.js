import AsyncAF, {AsyncAfWrapperProto as AsyncAfProto} from './AsyncAfWrapper';

import logAF from './methods/other/logAF';
import forEachAF from './methods/combined/forEachAF';
import mapAF from './methods/combined/mapAF';
import filterAF from './methods/combined/filterAF';

AsyncAfProto.logAF = logAF;

AsyncAfProto.prototype.forEachAF = forEachAF;

AsyncAfProto.prototype.mapAF = mapAF;

AsyncAfProto.prototype.filterAF = filterAF;

export default AsyncAF;
