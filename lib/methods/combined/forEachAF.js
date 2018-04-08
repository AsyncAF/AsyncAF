/**
 * executes a callback function on each element in an array;
 *
 * if any elements are a `Promise`, they will first be resolved in parallel and then processed
 *
 * @param {callback} callback function to execute for each element
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise.<undefined>} `Promise` that resolves to `undefined`
 * @example
 *
 * ```js
 * const promises = [
 *   Promise.resolve(1),
 *   Promise.resolve(2),
 * ];
 *
 * AsyncAF(promises).forEachAF(el => {
 *   console.log(el);
 * }); // => logs 1 then 2
 * ```
 * @since 3.0.0
 * @alias forEach
 */
const forEachAF = function (callback, thisArg) {
  return this.then(arr => arr.forEach(callback, thisArg));
};

export default forEachAF;

/* istanbul ignore next */
/* eslint-disable no-unused-vars, valid-jsdoc */
/**
 * @typedef {callback} _
 * @param {?} currentValue value of the current element being processed in the array
 * @param {Number=} index index of the current element being processed in the array
 * @param {[]=} array the array that forEachAF is being applied to
 */
function callback(currentValue, index, array) {
  /* noop just for jsdoc */
} /* eslint-enable */
