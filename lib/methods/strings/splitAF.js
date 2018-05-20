/**
 * splits a string into an array of substrings, using a specified separator to determine where to make each split
 *
 * @param {String=} separator a regular expression or string that denotes the points at which each split should occur
 * - if a plain-text separator contains more than one character, the entire separator must be found to represent a split point
 * - if separator is omitted or does not occur in the string, the array returned will contain one element consisting of the entire string
 * - if separator is an empty string, the string is converted to an array of individual characters
 * - if separator is a regular expression, the array returned will also contain any separators found as a result of matches within capturing parentheses
 * @param {Number=} limit integer specifying a limit on the number of elements to be included in the result; when provided, the string is split at each occurrence of the specified separator but stops including elements when the limit is reached (or the end of the string, if reached sooner); any left-over text is not included in the result
 * @returns {Promise.<String[]>} `Promise` that resolves to an array of strings, split at each point the separator occurs in the given string
 * @example
 *
 * // basic usage
 * const str = Promise.resolve('s; p; l; i; t');
 *
 * AsyncAF(str).splitAF('; '); // Promise that resolves to ['s', 'p', 'l', 'i', 't']
 *
 * // no separator specified or separator not found
 * const str = Promise.resolve('splat');
 *
 * AsyncAF(str).splitAF(); // Promise that resolves to ['splat']
 * AsyncAF(str).splitAF('n/a'); // Promise that resolves to ['splat']
 *
 * // split to individual characters
 * const str = Promise.resolve('splitAF');
 *
 * AsyncAF(str).splitAF(''); // Promise that resolves to ['s', 'p', 'l', 'i', 't', 'A', 'F']
 *
 * // split on a regular expression
 * const str = Promise.resolve('splittedAF');
 *
 * AsyncAF(str).splitAF(/sp|ted/); // Promise that resolves to ['', 'lit', 'AF']
 *
 * // and w/ capturing parentheses
 *
 * AsyncAF(str).splitAF(/(lit|AF)/); // Promise that resolves to ['sp', 'lit', '', 'AF', '']
 *
 * // setting limit
 * const str = Promise.resolve('splitted');
 *
 * AsyncAF(str).splitAF('', 5); // Promise that resolves to ['s', 'p', 'l', 'i', 't']
 * AsyncAF(str).splitAF('', 12); // Promise that resolves to ['s', 'p', 'l', 'i', 't', 't', 'e', 'd']
 * AsyncAF(str).splitAF('', 0); // Promise that resolves to []
 *
 * @since 5.1.0
 * @see split
 * @memberof AsyncAF#
 */
const splitAF = function (separator = undefined, limit = undefined) {
  return this.then(str => {
    if (typeof str !== 'string' || Array.isArray(str))
      throw TypeError(`splitAF may be called on a string but was called on ${str}`);
    return String.prototype.split.call(str, separator, limit);
  });
};

export default splitAF;
