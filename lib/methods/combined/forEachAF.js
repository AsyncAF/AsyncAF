/**
 * executes a callback function on each element in an array;
 * if any element is a `Promise`, it will first be resolved and then processed
 *
 * @param {callback} callback function to execute for each element
 * @param {Object=} thisArg value to use as `this` when executing `callback`
 * @returns {Promise} undefined
 */
const forEachAF = async function forEachAF(callback, thisArg) {
  await Promise.all(this.value()).then(arr => {
    arr.forEach(callback, thisArg);
  });
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
