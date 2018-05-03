import callback from '../_internal/reduceCallback'; // eslint-disable-line no-unused-vars

/**
 * applies a function against an accumulator and each element in an array (from left to right) to reduce it to a single value
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then processed
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
 * AsyncAF.logAF(6); // logs 6
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
 * @see reduce
 * @memberof AsyncAF#
 */
const reduceAF = function(callback, initialValue = null) {
  return this.then(arr => {
    if (!arr) throw TypeError(`Cannot read property 'reduceAF' of ${arr}`);
    if (!Array.isArray(arr)) throw TypeError(`${arr}.reduceAF is not a function`);
    if (!arr.length && initialValue === null)
      throw TypeError('reduceAF of empty array with no initial value');
    return arr.reduce(callback, initialValue)
  });
};

export default reduceAF;
