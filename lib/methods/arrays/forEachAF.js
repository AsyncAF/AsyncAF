import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';

/**
 * executes a callback function on each element in an array
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then processed
 *
 * @param {callback} callback function to execute for each element
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that forEachAF is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<undefined>} `Promise` that resolves to `undefined`
 * @example
 *
 * const promises = [1, 2].map(n => Promise.resolve(n));
 *
 *
 * AsyncAF(promises).forEachAF(el => {
 *   console.log(el); // logs 1 then 2
 * });
 * @since 3.0.0
 * @see forEach
 * @memberof AsyncAF#
 */
const forEachAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `forEachAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    return Array.prototype.forEach.call(arr, callback, thisArg);
  });
};

export default forEachAF;
