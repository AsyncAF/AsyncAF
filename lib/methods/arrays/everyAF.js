import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';
import {parallel} from '../_internal/resolve';

/**
 * tests whether all elements in the array pass the test implemented by the provided callback function
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then tested
 *
 * *Note*: since `everyAF` is run in parallel, `callback` will be run on all elements even if one of the first few elements fails the test; if this behavior is not desireable, consider using `series.everyAF` or its alias, `io.everyAF`
 *
 * @param {callback} callback function that tests each element of the array
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that `everyAF` is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<Boolean>} `Promise` that resolves to `true` if the callback function returns a truthy value for every array element; otherwise, `false`
 * @example
 *
 * const promises = [1, 2, 3].map(n => Promise.resolve(n));
 *
 *
 * // basic usage
 * const allAreOdd = AsyncAF(promises).everyAF(n => n % 2);
 *
 * console.log(allAreOdd); // Promise that resolves to false
 *
 * AsyncAF.logAF(allAreOdd); // logs false
 *
 *
 * // using .then
 * AsyncAF(promises).everyAF(n => n % 2).then(allAreOdd => {
 *   console.log(allAreOdd); // logs false
 * });
 *
 *
 * // inside an async function
 * (async () => {
 *   const allAreNums = await AsyncAF(promises).everyAF(
 *     n => typeof n === 'number'
 *   );
 *   console.log(allAreNums); // logs true
 * })();
 * @since 3.2.0
 * @see every (alias)
 * @see {@link AsyncAF#series series.everyAF}
 * @memberof AsyncAF#
 */
const everyAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `everyAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);
    const length = arr.length >>> 0;
    return this.inSeries
      ? (!length && true) || (function seriesEveryAF(arr, i) {
        const hole = !(i in arr);
        return Promise.resolve(arr[i]).then(el => {
          arr[i] = el;
          return Promise.resolve(!hole && callback.call(thisArg, el, i, arr))
            .then(bool => {
              if (!bool && !hole) return false;
              if (i === length - 1) return true;
              return seriesEveryAF(arr, i + 1);
            });
        });
      }(Array.prototype.slice.call(arr), 0))
      : parallel(arr, callback, thisArg).then(bools => bools.every(Boolean));
  });
};

export default everyAF;
