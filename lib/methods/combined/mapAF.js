/**
 * creates a new `Array` with the results of calling a provided function on every element in the calling array;
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then processed
 *
 * @param {callback} callback function that produces an element of the new `Array`
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<Array>} `Promise` that resolves to a new `Array` with each element being the result of calling `callback` on each original element
 * @example
 *
 * ```js
 * // basic usage
 * const doubled = AsyncAF(promises).mapAF(el => el * 2);
 *
 * console.log(doubled); // Promise that resolves to [2, 4]
 *
 * AsyncAF.logAF(doubled); // logs [2, 4]
 *
 * // using .then
 * AsyncAF(promises).mapAF(el => el * 3).then(tripled => {
 *   console.log(tripled); // logs [3, 6]
 * });
 *
 * // inside an async function
 * (async () => {
 *   const quadrupled = await AsyncAF(promises)
 *     .mapAF(el => el * 4);
 *   console.log(quadrupled); // logs [4, 8]
 * })();
 * ```
 * @since 3.0.0
 * @alias map
 */
const mapAF = function (callback, thisArg) {
  return this.then(arr => arr.map(callback, thisArg));
};

export default mapAF;

/* istanbul ignore next */
/* eslint-disable no-unused-vars */
/**
 * @typedef {callback} _
 * @param {?} currentValue value of the current element being processed in the array
 * @param {Number=} index index of the current element being processed in the array
 * @param {[]=} array the array that mapAF is being applied to
 * @returns {*} _
 */
function callback(currentValue, index, array) {
  /* noop just for jsdoc */
} /* eslint-enable */
