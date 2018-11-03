import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';
import {parallel} from '../_internal/resolve';

/**
 * resolves to the index of the first element in the array that satisfies the provided callback function; otherwise, `-1`
 *
 * *Note*: since `findIndexAF` is run in parallel, `callback` will be run on all indices even if one of the first few indices passes the test; if this behavior is not desireable, consider using `series.findIndexAF` or its alias, `io.findIndexAF`
 *
 * @param {callback} callback function to test each element in the array
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that findIndexAF is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<Number>} `Promise` that resolves to the index of the first element in the array that passes the test; otherwise, `-1`
 * @example
 *
 * const inventory = [
 *  {name: 'nuts', quantity: 2000},
 *  {name: 'bolts', quantity: 5000},
 *  {name: 'screws', quantity: 9001}
 * ].map(part => Promise.resolve(part));
 *
 * AsyncAF(inventory).findIndexAF(part => part.name === 'screws');
 * // Promise that resolves to 2
 * @since 3.5.0
 * @see findIndex (alias)
 * @memberof AsyncAF#
 */
const findIndexAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `findIndexAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);
    const filled = Array.from(arr);
    const length = filled.length >>> 0;
    return this.inSeries
      ? (!length && -1) || (function seriesFindIndexAF(arr, i) {
        return Promise.resolve(arr[i]).then(el => {
          arr[i] = el;
          return Promise.resolve(callback.call(thisArg, el, i, arr)).then(bool => {
            if (bool) return i;
            if (i === length - 1) return -1;
            return seriesFindIndexAF(arr, i + 1);
          });
        });
      }(filled, 0))
      : parallel(filled, callback, thisArg).then(bools => bools.indexOf(true));
  });
};

export default findIndexAF;
