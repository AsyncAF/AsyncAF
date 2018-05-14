/**
 * adds prototype/static methods to AsyncAF or AsyncAfWrapper
 *
 * see {@link AsyncAfWrapper AsyncAfWrapper} for an example of how to cherry-pick AsyncAF methods you'd like to use rather than pulling in the entire AsyncAF library;
 *
 * for something different, the following shows how to add custom methods to AsyncAF & AsyncAfWrapper
 *
 * **Example**
 *
 * say you want to extend AsyncAF with your own prototype method that acts on an array of numbers or promises that resolve to numbers and naively adds them up
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
 * pull in {@link AsyncAF AsyncAF} or {@link AsyncAfWrapper AsyncAfWrapper} and `sumAF` to the file you'd like to use it in:
 *
 * ```js
 * // otherFile.js
 *
 * import AsyncAF from 'async-af'; // or import AsyncAF from '@async-af/wrapper';
 * import sumAF from './sumAF';
 * ```
 *
 * then, call `use` on `AsyncAF` and pass in `sumAF` wrapped in an object to the first parameter, `prototypeMethods`:
 *
 * ```js
 * // otherFile.js
 * // ...
 *
 * AsyncAF.use({sumAF});
 * ```
 *
 * ready! now your custom prototype method will be available on AsyncAF
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
 * if you'd like to add a static method to AsyncAF, `use` accepts a second optional argument `staticMethods`; for example:
 *
 * ```js
 * const staticNoop = () => {};
 *
 * AsyncAF.use({}, {staticNoop});
 *
 * AsyncAF.staticNoop(); // noop
 * ```
 *
 * @static
 * @param {Object} prototypeMethods an Object containing the prototype methods you'd like to use
 * @param {Object=} staticMethods an Object containing the static methods you'd like to use
 * @returns {undefined} adds prototype/static methods to AsyncAF or AsyncAfWrapper
 * @since 3.0.0
 * @see AsyncAF
 * @see AsyncAfWrapper
 * @see {@tutorial TOO_MANY_IMPORTS}
 * @memberof AsyncAfWrapper
 * @alias AsyncAfWrapper#use
 */
const use = function use(prototypeMethods, staticMethods = {}) {
  if (typeof prototypeMethods !== 'object') throw TypeError(
    'prototypeMethods param accepts an Object containing the prototypeMethods you\'d like to add to the AsyncAF prototype, or an empty Object',
  );
  if (typeof staticMethods !== 'object') throw TypeError(
    'staticMethods param accepts an Object containing the staticMethods you\'d like to add to AsyncAF',
  );
  Object.assign(this.prototype, prototypeMethods);
  Object.assign(this, staticMethods);
};

export default use;
