import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars

/**
 * tests whether at least one element in the array passes the test implemented by the provided callback function
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then tested
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
 * @see some
 * @memberof AsyncAF#
 */
const someAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!arr) throw TypeError(`Cannot read property 'someAF' of ${arr}`);
    if (!Array.isArray(arr)) throw TypeError(`${arr}.someAF is not a function`);
    return arr.some(callback, thisArg);
  });
};

export default someAF;
