import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';
import {parallel} from '../_internal/resolve';

/**
 * resolves to the value of the first element in the array that satisfies the provided callback function; otherwise, `undefined`
 *
 * *Note*: since `findAF` is run in parallel, `callback` will be run on all elements even if one of the first few elements passes the test; if this behavior is not desireable, consider using `series.findAF` or its alias, `io.findAF`
 *
 * @param {callback} callback function to test each element in the array
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that findAF is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<any>} `Promise` that resolves to the first element in the array that passes the test; otherwise, undefined
 * @example
 *
 * const inventory = [
 *  {name: 'nuts', quantity: 2000},
 *  {name: 'bolts', quantity: 5000},
 *  {name: 'screws', quantity: 9001}
 * ].map(part => Promise.resolve(part));
 *
 * AsyncAF(inventory).findAF(part => part.name === 'screws');
 * // Promise that resolves to {name: 'screws', quantity: 9001}
 * @since 3.5.0
 * @see find (alias)
 * @see {@link AsyncAF#series series.findAF}
 * @memberof AsyncAF#
 */
const findAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `findAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);
    const filled = Array.from(arr);
    const length = filled.length >>> 0;
    return this.inSeries
      ? (length || undefined) && (function seriesFindAF(arr, i) {
        return Promise.resolve(arr[i]).then(el => {
          arr[i] = el;
          return Promise.resolve(callback.call(thisArg, el, i, arr)).then(bool => {
            if (bool) return el;
            if (i === length - 1) return;
            return seriesFindAF(arr, i + 1);
          });
        });
      }(filled, 0))
      : parallel(filled, callback, thisArg).then(bools => arr[bools.indexOf(true)]);
  });
};

export default findAF;
