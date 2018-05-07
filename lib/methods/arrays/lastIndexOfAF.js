/**
 * returns the last index of the specified element or string, searching backwards in an array, string, or array-like object; `fromIndex` offsets the start of the search; if the value is not found, returns `-1`
 *
 * @param {any} searchItem the element or string to search for
 * @param {Number=} fromIndex the index at which to begin searching backwards for `searchItem`; a negative value searches from the index of `array/string.length - fromIndex`; defaults to `array/string.length - 1`
 * @returns {Promise.<Number>} `Promise` that resolves to the last index of `searchItem` if found; otherwise, `-1`
 * @example
 *
 * // lastIndexOfAF on an array of promises
 * const nums = [1, 1, 2, 2, 3, 3].map(n => Promise.resolve(n));
 *
 * AsyncAF(nums).lastIndexOfAF(2); // Promise that resolves to 3
 *
 * AsyncAF(nums).lastIndexOfAF(5); // Promise that resolves to -1
 *
 * AsyncAF(nums).lastIndexOfAF(2, -4); // Promise that resolves to 2
 *
 * AsyncAF(nums).lastIndexOfAF(3, -3); // Promise that resolves to -1
 *
 * // lastIndexOfAF on a promise-wrapped string
 * const string = Promise.resolve('test string to test');
 *
 * AsyncAF(string).lastIndexOfAF('test'); // Promise that resolves to 15
 *
 * AsyncAF(string).lastIndexOfAF('nope'); // Promise that resolves to -1
 *
 * AsyncAF(string).lastIndexOfAF('test', -5); // Promise that resolves to 0
 *
 * AsyncAF(string).lastIndexOfAF('to', -7); // Promise that resolves to -1
 *
 * // lastIndexOfAF on an array-like object
 * (async function () {
 *   const lastIndexOf2 = await AsyncAF(arguments).lastIndexOfAF(2);
 *   console.log(`the last index of 2 in the arguments array-like object is ${lastIndexOf2}`)
 * })(1, 1, 2, 2, 3, 3); // the last index of 2 in the arguments array-like object is 3
 *
 * @since 3.6.0
 * @see lastIndexOf
 * @memberof AsyncAF#
 */
const lastIndexOfAF = function (searchItem, fromIndex = undefined) {
  return this.then(arrOrStr => {
    // eslint-disable-next-line curly
    if (arrOrStr == null || arrOrStr.length == null || typeof arrOrStr === 'function')
      throw TypeError(
        `lastIndexOfAF cannot be called on ${arrOrStr}, only on an Array, String, or array-like Object`,
      );
    return (typeof arrOrStr === 'string' ? String : Array)
      .prototype.lastIndexOf.call(arrOrStr, searchItem, fromIndex || arrOrStr.length - 1);
  });
};

export default lastIndexOfAF;
