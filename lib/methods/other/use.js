/**
 * adds prototype methods to AsyncAF or AsyncAfWrapper
 *
 * see {@link AsyncAfWrapper AsyncAfWrapper} for an example of how to cherry-pick AsyncAF methods you'd like to use rather than pulling in the entire AsyncAF library;
 *
 * for something different, the following shows how to add custom prototype methods to AsyncAF & AsyncAfWrapper
 *
 * **Example:**
 *
 * say you want to extend AsyncAF with your own method that acts on an array of non-promises or promises that resolve to numbers and naively adds them up
 *
 * let's call it sumAF; here's some code:
 *
 * ```js
 * // sumAF.js
 *
 * const sumAF = function () {
 *   return this.then(numbers => numbers.reduce((sum, num) => sum + num));
 * };
 *
 * export default sumAF;
 * ```
 *
 * pull in {@link AsyncAF AsyncAF} or {@link AsyncAfWrapper AsyncAfWrapper} and sumAF to the file you'd like to use it in:
 *
 * ```js
 * // otherFile.js
 *
 * import AsyncAF from 'async-af';
 * import sumAF from './sumAF';
 * ```
 *
 * then, call `use` on {@link AsyncAF AsyncAF} and pass in sumAF wrapped in an object:
 *
 * ```js
 * // otherFile.js
 * // ...
 *
 * AsyncAF.use({sumAF});
 * ```
 *
 * ready! now your custom prototype method will be available on {@link AsyncAF AsyncAF}
 *
 * ```js
 * // otherFile.js
 * // ...
 *
 * const promises = [1, 2, 3].map(n => Promise.resolve(n));
 *
 * const sum = AsyncAF(promises).sumAF()
 *
 * AsyncAF.logAF(sum);
 * // @otherFile.js:10:9:
 * //  6
 * // in 0.001 secs
 * ```
 *
 * @static
 * @param {Object} methods an Object containing the prototype methods you'd like to use
 * @returns {undefined} adds prototype methods to AsyncAF or AsyncAfWrapper
 * @since 3.0.0
 * @see AsyncAF
 * @see AsyncAfWrapper
 * @memberof AsyncAfWrapper
 * @alias AsyncAfWrapper#use
 */
const use = function use(methods) {
  if (typeof methods !== 'object') throw new TypeError(
    'use method accepts an Object containing the methods you\'d like to add to the AsyncAF prototype',
  );
  Object.assign(this.prototype, methods);
};

export default use;
