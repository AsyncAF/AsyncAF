import callback from '../internal/commonCallback'; // eslint-disable-line no-unused-vars

/**
 * executes a callback function on each element in an array;
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then processed
 *
 * @param {callback} callback function to execute for each element
 *
 * `callback` accepts three arguments:
 * - `currentValue` value of the current element being processed in the array
 * - *`index (optional)`* index of `currentValue` in the array
 * - *`array (optional)`* the array that forEachAF is being applied to
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<undefined>} `Promise` that resolves to `undefined`
 * @example
 *
 * ```js
 * const promises = [1, 2].map(n => Promise.resolve(n));
 *
 * AsyncAF(promises).forEachAF(el => {
 *   console.log(el); // logs 1 then 2
 * });
 * ```
 * @since 3.0.0
 * @alias forEach
 */
const forEachAF = function (callback, ...thisArg) {
  return this.then(arr => arr.forEach(callback, thisArg[0]));
};

export default forEachAF;
