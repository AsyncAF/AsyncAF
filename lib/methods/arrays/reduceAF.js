import callback from '../_internal/reduceCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';
import {parallel, serial} from '../_internal/resolve';

/* eslint-disable prefer-rest-params */
/**
 * applies a function against an accumulator and each element in an array (from left to right) to reduce it to a single value
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then processed in series
 *
 * *Note*: if this behavior is not desirable, consider using `series.reduceAF` or its alias, `io.reduceAF`; that way, if any elements are a `Promise`, they will both be resolved in series _and_ processed in series
 *
 * @param {callback} callback function to execute for each element
 *
 * `callback` accepts up to four arguments:
 * - `accumulator` accumulates the callback's return values; the accumulated value previously returned in the last invocation of the callback, or initialValue, if supplied
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that `reduceAF` is being applied to
 * @param {any=} initialValue value to use as the first argument to the first call of the callback; if no initial value is supplied, the first element in the array will be used; note: calling reduceAF on an empty array with no initial value will throw an error
 * @returns {Promise.<any>} `Promise` that resolves to the reduced value
 * @example
 *
 * const promises = [1, 2, 3].map(n => Promise.resolve(n));
 *
 *
 * // basic usage
 * const sum = AsyncAF(promises).reduceAF((sum, num) => sum + num);
 *
 * console.log(sum); // Promise that resolves to 6
 *
 * AsyncAF.logAF(sum); // logs 6
 *
 *
 * // using .then
 * AsyncAF(promises).reduceAF((sum, num) => sum + num).then(sum => {
 *   console.log(sum); // logs 6
 * });
 *
 *
 * // inside an async function
 * (async () => {
 *   const sum = await AsyncAF(promises).reduceAF((sum, num) => sum + num);
 *   console.log(sum); // logs 6
 * })();
 *
 *
 * // using an initial value
 * AsyncAF(promises).reduceAF((sum, num) => sum + num, 12) // Promise that resolves to 18
 * @since 3.1.0
 * @see reduce (alias)
 * @memberof AsyncAF#
 */
const reduceAF = function(callback,/* initialValue */) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `reduceAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);
    const length = arr.length >>> 0;
    if (!length && arguments.length === 1) throw TypeError(
      'reduceAF cannot be called on an empty array without an initial value'
    );
    if (!length) return arguments[1];
    const hole = i => !(i in arr);
    let i = 0;
    let acc;
    if (arguments.length === 2)
      acc = arguments[1];
    else {
      while (hole(i)) i++;
      acc = arr[i++];
    }
    return (this.inSeries ? serial(arr) : parallel(arr)).then(arr => {
      const reduceAF = (acc, i) => Promise.resolve(acc).then(acc => Promise.resolve(
        !hole(i) ? callback(acc, arr[i], i, arr) : acc
      ).then(acc => i === length - 1 ? acc : reduceAF(acc, i + 1)));
      return reduceAF(acc, i);
    });
  });
};

export default reduceAF;
