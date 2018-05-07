import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars
import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';

/**
 * returns the index of the first element in the array that satisfies the provided callback function; otherwise, `-1`
 *
 * @param {callback} callback function to test each element in the array
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that findIndexAF is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<Number>} `Promise` that resolves to the index of the first element in the array that passes the test; otherwise, `-1`
 * @example
 *
 * const inventory = [
 *  {name: 'nuts', quantity: 2000},
 *  {name: 'bolts', quantity: 5000},
 *  {name: 'screws', quantity: 9001}
 * ].map(part => Promise.resolve(part));
 *
 * AsyncAF(inventory).findAF(part => part.name === 'screws');
 * // Promise that resolves to 2
 * @since 3.5.0
 * @see findIndex
 * @memberof AsyncAF#
 */
const findIndexAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `findIndexAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    return Array.prototype.findIndex.call(arr, callback, thisArg);
  });
};

export default findIndexAF;
