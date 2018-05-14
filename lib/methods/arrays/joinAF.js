import permissiveIsArrayLike from '../_internal/permissiveIsArrayLike';

/**
 * joins all elements of an array or array-like object into a string and returns that string
 *
 * @param {any} separator the string that separates each element in the resulting string; defaults to `','`; non-string separators will be converted to strings if necessary; if `separator` is an empty string `''`, the array elements are joined without any characters between them
 * @returns {Promise.<String>} `Promise` that resolves to a string with all array elements joined; if array.length is `0`, an empty string `''` is returned
 * @example
 *
 * const animals = ['cow', 'chicken', 'cat', 'dog'].map(a => Promise.resolve(a));
 *
 * // joinAF separator defaults to ','
 * AsyncAF(animals).joinAF(); // Promise that resolves to 'cow,chicken,cat,dog'
 *
 * // specifying separator
 * AsyncAF(animals).joinAF(' & '); // Promise that resolves to 'cow & chicken & cat & dog'
 *
 * // a non-string separator will be converted to a string
 * AsyncAF(animals).joinAF(2); // Promise that resolves to 'cow2chicken2cat2dog'
 *
 * // empty string separator
 * AsyncAF(animals).joinAF(''); // Promise that resolves to 'cowchickencatdog'
 *
 * // joining an empty array returns an empty string
 * AsyncAF([]).joinAF('+'); // Promise that resolves to ''
 *
 * // joinAF on an array-like object
 * (async function () {
 *  const list = await AsyncAF(arguments).joinAF(' - ');
 *  console.log(`Shopping List: ${list}`);
 * })('eggs', 'milk', 'butter', 'pancake mix');
 * // Shopping List: eggs - milk - butter - pancake mix
 *
 * @since 3.6.0
 * @see join
 * @memberof AsyncAF#
 */
const joinAF = function (separator = ',') {
  return this.then(arr => {
    if (!permissiveIsArrayLike(arr)) throw TypeError(
      `joinAF cannot be called on ${arr}, only on an Array or array-like Object`,
    );
    return Array.prototype.join.call(arr, separator);
  });
};

Object.defineProperty(joinAF, 'length', {value: 1});

export default joinAF;
