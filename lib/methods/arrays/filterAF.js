import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';

/**
 * creates a new `Array` with all elements that pass the test implemented by the provided callback function
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then tested
 *
 * @param {callback} callback function that tests each element of the array; return `true` to keep the element, `false` to filter it out
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that `filterAF` is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<Array>} `Promise` that resolves to a new `Array` with the elements that pass the test; if no elements pass the test, the promise will resolve to an empty array
 * @example
 *
 * const promises = [1, 2, 3].map(n => Promise.resolve(n));
 *
 *
 * // basic usage
 * const odds = AsyncAF(promises).filterAF(n => n % 2);
 *
 * console.log(odds); // Promise that resolves to [1, 3]
 *
 * AsyncAF.logAF(odds); // logs [1, 3]
 *
 *
 * // using .then
 * AsyncAF(promises).filterAF(n => n % 2).then(odds => {
 *   console.log(odds); // logs [1, 3]
 * });
 *
 *
 * // inside an async function
 * (async () => {
 *   const odds = await AsyncAF(promises).filterAF(
 *     n => n % 2
 *   );
 *   console.log(odds); // logs [1, 3]
 * })();
 * @since 3.0.0
 * @see filter (alias)
 * @memberof AsyncAF#
 */
const filterAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `filterAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    return Array.prototype.filter.call(arr, callback, thisArg);
  });
};

export default filterAF;
