import createNewlessClass from '../methods/_internal/createNewlessClass';
import use from '../methods/other/use';
import series from '../methods/other/series';

const dataStore = new WeakMap();

class AsyncAfWrapperProto {
  constructor(data) {
    dataStore.set(this, Promise.resolve(data));
  }
  then(resolve, reject) {
    return this.constructor(dataStore.get(this).then(resolve, reject));
  }
  catch(reject) {
    return this.then(null, reject);
  }
  finally(onFinally) {
    return dataStore.get(this).finally(onFinally);
  }
}

AsyncAfWrapperProto.use = use;

Object.defineProperties(AsyncAfWrapperProto.prototype, {
  ...series,
  [Symbol.toStringTag]: {value: 'AsyncAF'},
});

/**
 * empty AsyncAF class wrapper
 *
 * AsyncAfWrapper is one option for cherry-picking only the methods you'd like to use in your code; {@link AsyncAfWrapper#use use}, {@link AsyncAF#series series}, and {@link AsyncAF#io io} are the only methods initially available on AsyncAfWrapper; see example below
 *
 * **Note:** while AsyncAfWrapper is a class, it can create instances with or without the `new` keyword
 *
 * **Example**
 *
 * say you only want to use {@link AsyncAF#mapAF mapAF}, {@link AsyncAF#filterAF filterAF}, {@link AsyncAF#forEachAF forEachAF}, and {@link AsyncAF#logAF logAF} instead of pulling in the entire AsyncAF library
 *
 * first, install the separate packages (e.g., for npm):
 *
 * `$ npm install --save @async-af/{wrapper,map,filter,foreach,log}`
 *
 * or, if on Windows:
 *
 * `$ npm install --save @async-af/wrapper @async-af/map @async-af/filter @async-af/foreach @async-af/log`
 *
 * then import the packages
 * ```js
 * import AsyncAF from '@async-af/wrapper'; // aliasing 'AsyncAfWrapper' as 'AsyncAF'
 * import mapAF from '@async-af/map';
 * import filterAF from '@async-af/filter';
 * import forEachAF from '@async-af/foreach';
 * import logAF from '@async-af/log';
 * ```
 *
 * _if you'd like to save some vertical screen real estate and cut the imports down to one line, see_ {@tutorial TOO_MANY_IMPORTS}
 *
 * then call {@link AsyncAfWrapper#use use}, including all prototype methods you'd like to add to AsyncAfWrapper's prototype in the first argument, `prototypeMethods` and all static methods you'd like to add to AsyncAfWrapper in the second optional argument, `staticMethods`
 * ```js
 * AsyncAF.use({ // prototype methods go in the first argument
 *   mapAF,
 *   filterAF,
 *   forEachAF
 * }, { // static methods go in the second argument
 *   logAF
 * });
 * ```
 *
 * ready to go!
 * ```js
 * const promises = [1, 2, 3].map(n => Promise.resolve(n));
 *
 * AsyncAF(promises).mapAF(n => n * 2).filterAF(n => n !== 4).forEachAF(n => console.log(n));
 * // logs 2 then 6
 *
 * AsyncAF.logAF(promises);
 * // @filename.js:24:9:
 * //  [ 1, 2, 3 ]
 * // in 0.003 secs
 * ```
 *
 * **protip:** you can use the same technique to add your own custom prototype or static methods to AsyncAfWrapper or even to the main AsyncAF class; see {@link AsyncAfWrapper#use use} for an example
 * @param {any} data the data to be wrapped by the AsyncAF class; can be promises or non-promises
 * @returns {Object} returns an instance of AsyncAfWrapper wrapping the passed in data
 * @since 3.0.0
 * @see AsyncAF
 * @see {@link AsyncAfWrapper#use use}
 * @see {@tutorial TOO_MANY_IMPORTS}
 * @class AsyncAfWrapper
 */
const AsyncAfWrapper = createNewlessClass(
  class AsyncAfWrapper extends AsyncAfWrapperProto {},
);

export {AsyncAfWrapperProto};
export default AsyncAfWrapper;
