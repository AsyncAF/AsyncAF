import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';
import {parallel} from '../_internal/resolve';

/**
 * resolves to the last index of the specified element or string, searching backwards in an array, string, or array-like object; `fromIndex` offsets the start of the search; if the value is not found, resolves to `-1`
 *
 * *Note*: when called on an array or array-like object, `lastIndexOfAF` is run in parallel and all elements will be resolved even if one of the last few indices is a match; if this behavior is not desireable, consider using `series.lastIndexOfAF` or its alias, `io.lastIndexOfAF`
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
 * @see lastIndexOf (alias)
 * @see {@link AsyncAF#series series.lastIndexOfAF}
 * @memberof AsyncAF#
 */
const lastIndexOfAF = function (searchItem, fromIndex = undefined) {
  return this.then(arrOrStr => {
    if (!permissiveIsArrayLike(arrOrStr)) throw TypeError(
      `lastIndexOfAF cannot be called on ${arrOrStr}, only on an Array, String, or array-like Object`,
    );
    const len = arrOrStr.length >>> 0;
    let fromIdx = Number(fromIndex);
    if (Number.isNaN(fromIdx)) fromIdx = len - 1;
    return typeof arrOrStr === 'string'
      ? arrOrStr.lastIndexOf(searchItem, fromIdx)
      : this.inSeries
        ? (function seriesLastIndexOfAF(i) {
          return Promise.resolve(arrOrStr[i]).then(el => {
            if (i in arrOrStr && el === searchItem) return i;
            if (i <= 0) return -1;
            return seriesLastIndexOfAF(i - 1);
          });
        }(Math.min(fromIdx >= 0 ? fromIdx : Math.max(len - Math.abs(fromIdx), 0), len - 1)))
        : parallel(arrOrStr).then(arr => arr.lastIndexOf(searchItem, fromIdx));
  });
};

export default lastIndexOfAF;
