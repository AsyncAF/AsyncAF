import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';

/**
 * creates a new `Array` with the results of calling a provided function on every element in the original array
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then processed
 *
 * @param {callback} callback function that produces an element of the new `Array`
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that mapAF is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<Array>} `Promise` that resolves to a new `Array` with each element being the result of calling `callback` on each original element
 * @example
 *
 * const promises = [1, 2].map(n => Promise.resolve(n));
 *
 *
 * // basic usage
 * const doubled = AsyncAF(promises).mapAF(el => el * 2);
 *
 * console.log(doubled); // Promise that resolves to [2, 4]
 *
 * AsyncAF.logAF(doubled); // logs [2, 4]
 *
 *
 * // using .then
 * AsyncAF(promises).mapAF(el => el * 3).then(tripled => {
 *   console.log(tripled); // logs [3, 6]
 * });
 *
 *
 * // inside an async function
 * (async () => {
 *   const quadrupled = await AsyncAF(promises).mapAF(
 *     el => el * 4
 *   );
 *   console.log(quadrupled); // logs [4, 8]
 * })();
 * @since 3.0.0
 * @see map (alias)
 * @memberof AsyncAF#
 */
const mapAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `mapAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    if (typeof callback !== 'function') throw TypeError(`${callback} is not a function`);
    if (this.inSeries) {
      const retVal = [];
      return Array.prototype.reduce.call(arr, (promise, el, i, arr) => promise.then(() => {
        const next = Promise.resolve(callback.call(thisArg, el, i, arr));
        retVal.push(next);
        return next;
      }), Promise.resolve()).then(() => Promise.all(retVal));
    }
    return Promise.all(Array.prototype.map.call(arr, (el, i, arr) => (
      callback.call(thisArg, el, i, arr)
    )));
  });
};

export default mapAF;
