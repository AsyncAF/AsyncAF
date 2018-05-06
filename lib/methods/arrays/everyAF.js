import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars

/**
 * tests whether all elements in the array pass the test implemented by the provided callback function
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then tested
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
 * @see every
 * @memberof AsyncAF#
 */
const everyAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!arr) throw TypeError(`Cannot read property 'everyAF' of ${arr}`);
    if (!Array.isArray(arr)) throw TypeError(`${arr}.everyAF is not a function`);
    return arr.every(callback, thisArg);
  });
};

export default everyAF;
