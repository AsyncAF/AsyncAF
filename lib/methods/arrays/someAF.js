import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';
import {parallel} from '../_internal/resolve';

/**
 * tests whether at least one element in the array passes the test implemented by the provided callback function
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then tested
 *
 * *Note*: since `someAF` is run in parallel, `callback` will be run on all elements even if one of the first few elements passes the test; if this behavior is not desireable, consider using `series.someAF` or its alias, `io.someAF`
 *
 * @param {callback} callback function that tests each element of the array
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that `someAF` is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<Boolean>} `Promise` that resolves to `true` if the callback function returns a truthy value for any array element; otherwise, `false`
 * @example
 *
 * const promises = [1, 2, 3].map(n => Promise.resolve(n));
 *
 *
 * // basic usage
 * const someAreEven = AsyncAF(promises).someAF(n => n % 2 === 0);
 *
 * console.log(someAreEven); // Promise that resolves to true
 *
 * AsyncAF.logAF(someAreEven); // logs true
 *
 *
 * // using .then
 * AsyncAF(promises).someAF(n => n % 2 === 0).then(someAreEven => {
 *   console.log(someAreEven); // logs true
 * });
 *
 *
 * // inside an async function
 * (async () => {
 *   const someAreStrings = await AsyncAF(promises).someAF(
 *     n => typeof n === 'string'
 *   );
 *   console.log(someAreStrings); // logs false
 * })();
 * @since 3.3.0
 * @see some (alias)
 * @memberof AsyncAF#
 */
const someAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `someAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);
    const length = arr.length >>> 0;
    return this.inSeries
      ? (length || false) && (function seriesSomeAF(arr, i) {
        const hole = !(i in arr);
        return Promise.resolve(arr[i]).then(el => {
          arr[i] = el;
          return Promise.resolve(!hole && callback.call(thisArg, el, i, arr))
            .then(bool => {
              if (bool && !hole) return true;
              if (i === length - 1) return false;
              return seriesSomeAF(arr, i + 1);
            });
        });
      }(Array.prototype.slice.call(arr), 0))
      : parallel(arr, callback, thisArg).then(bools => bools.some(Boolean));
  });
};

export default someAF;
