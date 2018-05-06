import callback from '../_internal/commonCallback'; // eslint-disable-line no-unused-vars

/**
 * returns the value of the first element in the array that satisfies the provided callback function; otherwise, `undefined`
 *
 * @param {callback} callback function to test each element in the array
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - `index`*`(optional)`* index of `currentValue` in the array
 * - `array`*`(optional)`* the array that findAF is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<any>} `Promise` that resolves to the first element in the array that passes the test; otherwise, undefined
 * @example
 *
 * const inventory = [
 *  {name: 'nuts', quantity: 2000},
 *  {name: 'bolts', quantity: 5000},
 *  {name: 'screws', quantity: 9001}
 * ].map(part => Promise.resolve(part));
 *
 * AsyncAF(inventory).findAF(part => part.name === 'screws');
 * // Promise that resolves to {name: 'screws', quantity: 9001}
 * @since 3.5.0
 * @see find
 * @memberof AsyncAF#
 */
const findAF = function (callback, ...thisArg) {
  return this.then(arr => arr.find(callback, thisArg[0]));
};

export default findAF;
