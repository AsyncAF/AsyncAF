import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';

/**
 * resolves to the first index of the specified element or string in an array, string, or array-like object, starting the search at `fromIndex`; if the value is not found, resolves to `-1`
 *
 * @param {any} searchItem the element or string to search for
 * @param {Number=} fromIndex the index at which to begin searching for `searchItem`; a negative value searches from the index of `array/string.length - fromIndex`; defaults to `0`
 * @returns {Promise.<Number>} `Promise` that resolves to the index of `searchItem` if found; otherwise, `-1`
 * @example
 *
 * // indexOfAF on an array of promises
 * const nums = [1, 2, 3].map(n => Promise.resolve(n));
 *
 * AsyncAF(nums).indexOfAF(2); // Promise that resolves to 1
 *
 * AsyncAF(nums).indexOfAF(5); // Promise that resolves to -1
 *
 * AsyncAF(nums).indexOfAF(1, 1); // Promise that resolves to -1
 *
 * AsyncAF(nums).indexOfAF(3, -1); // Promise that resolves to 2
 *
 * // indexOfAF on a promise-wrapped string
 * const string = Promise.resolve('test string');
 *
 * AsyncAF(string).indexOfAF('test'); // Promise that resolves to 0
 *
 * AsyncAF(string).indexOfAF('nope'); // Promise that resolves to -1
 *
 * AsyncAF(string).indexOfAF('test', 5); // Promise that resolves to -1
 *
 * AsyncAF(string).indexOfAF('string', -6); // Promise that resolves to 5
 *
 * // indexOfAF on an array-like object
 * (async function () {
 *   if (await AsyncAF(arguments).indexOfAF(2) > -1) {
 *     console.log('2 is included');
 *   }
 * })(1, 2, 3); // logs '2 is included'
 *
 * @since 3.5.0
 * @see indexOf (alias)
 * @memberof AsyncAF#
 */
const indexOfAF = function (searchItem, fromIndex = 0) {
  return this.then(arrOrStr => {
    if (!permissiveIsArrayLike(arrOrStr)) throw TypeError(
      `indexOfAF cannot be called on ${arrOrStr}, only on an Array, String, or array-like Object`,
    );
    return (typeof arrOrStr === 'string' ? String : Array)
      .prototype.indexOf.call(arrOrStr, searchItem, fromIndex);
  });
};

export default indexOfAF;
