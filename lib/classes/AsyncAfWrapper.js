import use from '../methods/other/use';

class AsyncAfWrapperProto {
  constructor(data) {
    this.data = Promise[Array.isArray(data) ? 'all' : 'resolve'](data);
  }
  then(resolve, reject) {
    return new (this.constructor)(this.data.then(resolve, reject));
  }
  catch(reject) {
    return this.then(null, reject);
  }
}

class AsyncAfWrapper extends AsyncAfWrapperProto {}

const AsyncAfCreator = AsyncAfWrapper;

/**
 * empty AsyncAF class wrapper
 *
 * AsyncAfWrapper is one option for cherry-picking only the methods you'd like to use in your code; `use` is the only method initially available on the AsyncAfWrapper prototype; see example below
 *
 * **Note:** while AsyncAfWrapper is a class, it can create instances with or without the `new` keyword
 * @param {any} data the data to be wrapped by the AsyncAF class; can be promises or non-promises
 * @returns {Object} returns an instance of AsyncAF wrapping the passed in data
 * @example
 *
 * // say you only want to use 'mapAF', 'filterAF', and 'forEachAF' instead of pulling in the entire AsyncAF library
 *
 * // first, install the separage packages (e.g., for npm):
 * // '$ npm install --save async-af.wrapper async-af.mapAF async-af.filterAF async-af.forEachAF'
 *
 * // note: don't forget to append '.legacy' to each of the packages if you're running in a pre-ES6 environment
 *
 * // import the packages
 * import AsyncAF from 'async-af.wrapper';
 * import mapAF from 'async-af.mapAF';
 * import filterAF from 'async-af.filterAF';
 * import forEachAF from 'async-af.forEachAF';
 *
 * // then, call 'use' to add each of the methods to the empty AsyncAF class's prototype
 * AsyncAF.use({
 *   mapAF,
 *   filterAF,
 *   forEachAF
 * });
 *
 * // ready to go!
 * const promises = [1, 2, 3].map(n => Promise.resolve(n));
 *
 *
 * AsyncAF(promises).mapAF(n => n * 2).filterAF(n => n !== 4).forEachAF(n => console.log(n));
 * // logs 2 then 6
 * @since 3.0.0
 * @see AsyncAF
 * @see use
 * @class AsyncAfWrapper
 */
// eslint-disable-next-line no-class-assign
AsyncAfWrapper = function AsyncAfWrapper(data) {
  return new AsyncAfCreator(data);
};

AsyncAfWrapper.prototype = AsyncAfCreator.prototype;
Object.setPrototypeOf(AsyncAfWrapper, AsyncAfCreator);
AsyncAfWrapper.prototype.constructor = AsyncAfWrapper;

AsyncAfWrapperProto.use = use;

export {AsyncAfWrapperProto};
export default AsyncAfWrapper;
