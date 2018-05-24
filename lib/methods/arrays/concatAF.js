/**
 * merges an array or string with one or more arrays, strings, or other values, and returns a new array or string;
 *
 * concatAF flexibly accepts arrays, strings, promises, other values, or other instances of AsyncAF; see examples
 *
 * @param {any} values arrays, strings, or values to concatenate into a new array or string
 *  - if any values are a Promise, they'll first be resolved then concatenated
 *  - if any values are an instance of AsyncAF, they'll be merged into one instance
 * @returns {Promise.<Array>|Promise.<String>} `Promise` that resolves to a newly merged array or string
 * @example
 *
 * // arrays
 * const arr = Promise.resolve([1, 2]);
 * AsyncAF(arr).concatAF([3, 4]); // Promise that resolves to [1, 2, 3, 4]
 * AsyncAF(arr).concatAF([3, 4], [5, 6]); // Promise that resolves to [1, 2, 3, 4, 5, 6]
 *
 * // nested arrays
 * const arr1 = Promise.resolve([1, 2]);
 * const arr2 = [3, [4, 5]];
 * AsyncAF(arr1).concatAF(arr2); // Promise that resolves to [1, 2, 3, [4, 5]]
 *
 * // strings
 * const str = Promise.resolve('str');
 * AsyncAF(str).concatAF('ing'); // Promise that resolves to 'string'
 * AsyncAF(str).concatAF('ing', 'y'); // Promise that resolves to 'stringy'
 *
 * // other instances of AsyncAF
 * const aaf1 = AsyncAF([1, 2]);
 * const aaf2 = AsyncAF(3);
 *
 * aaf1.concatAF(aaf2); // Promise that resolves to [1, 2, 3];
 *
 * const aaf3 = AsyncAF('stringy');
 * const aaf4 = AsyncAF('AF');
 *
 * aaf3.concatAF(aaf4); // Promise that resolves to 'stringyAF'
 *
 * // promises
 * const [p1, p2, p3] = [[1, 2], 3, [4, [5, 6]]].map(v => Promise.resolve(v));
 *
 * AsyncAF(p1).concatAF(p2); // Promise that resolves to [1, 2, 3]
 * AsyncAF(p1).concatAF(p2, p3) // Promise that resolves to [1, 2, 3, 4, [5, 6]]
 *
 * const pStr1 = Promise.resolve('str');
 * const pStr2 = Promise.resolve('ing');
 * const pStr3 = Promise.resolve('y');
 *
 * AsyncAF(pStr1).concatAF(pStr2); // Promise that resolves to 'string'
 * AsyncAF(pStr1).concatAF(pStr2, pStr3); // Promise that resolves to 'stringy'
 *
 * // Note: concatAF will not resolve deeply nested promises; if you need this behavior, concatAF can be used in a
 * // function; for example, this function recursively flattens an array of promises
 *
 * const flattenAsync = arr => AsyncAF(arr).reduceAF(async (acc, val) => {
 *   return Array.isArray(await val)
 *     ? AsyncAF(acc).concatAF(flattenAsync(val))
 *     : AsyncAF(acc).concatAF(val), []);
 * };
 *
 * @since 5.3.0
 * @see concat
 * @memberof AsyncAF#
 */
const concatAF = function (...values) {
  return this.then(arrOrStr => {
    if (!(typeof arrOrStr === 'string' || Array.isArray(arrOrStr))) throw TypeError(
      `concatAF cannot be called on ${arrOrStr}, only on an Array or String`,
    );
    return values.reduce((arrOrStr, value) =>
      arrOrStr instanceof Promise
        ? arrOrStr.then(arrOrStr =>
          value instanceof this.constructor || value instanceof Promise
            ? value.then(value => arrOrStr.concat(value))
            : arrOrStr.concat(value), arrOrStr)
        : value instanceof this.constructor || value instanceof Promise
          ? value.then(value => arrOrStr.concat(value))
          : arrOrStr.concat(value), arrOrStr);
  });
};

export default concatAF;
