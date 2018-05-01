import {wrappedLog, wrappedWarn} from '../_internal/logging';
import options from './logAfHelpers/logAfOptions';
import setFormat from './logAfHelpers/setFormat';

/**
 * logs items to the console in the order given
 *
 * if any items are a promise, they will first be resolved in parallel and then logged
 *
 * ```js
 * import { logAF } from 'async-af';
 *
 * const promise = new Promise(resolve => setTimeout(
 *  () => resolve(2), 1000)
 * );
 *
 * logAF(1, promise, 3);
 *
 * // @filename.js:6:12:
 * // 1 2 3
 * // in 0.998 secs
 * ```
 *
 * **Note:** since logAF returns a promise, the items in the previous example would be logged *after* any synchronous calls to `console.log`
 *
 * to produce in-order logging with any surrounding calls to `console.log`, `await` logAF:
 * ```js
 * logAF.options({ label: false, duration: false });
 *
 * (async () => {
 *   console.log(1);
 *   // ...some code
 *   await logAF(promise);
 *   // ...some more code
 *   console.log(3);
 * })();
 *
 * // 1
 * // 2
 * // 3
 * ```
 *
 * **experimental feature**: the label may not work correctly in all environments; to turn the label off, set `label` to `false` in {@link AsyncAF#logAF_options logAF.options}, where you can also change the label's format
 *
 * @static
 * @param {any} items The items to print (log to the console)
 * @returns {Promise<undefined>} returns a `Promise` that logs items to the console
 * @see log
 * @see {@link AsyncAF#logAF_options logAF.options} to turn the label off or change its format
 * @see logAF.options.reset to reset options to default
 * @since 3.0.0
 * @memberof AsyncAF
 * @alias AsyncAF#logAF
 */
const logAF = function (...items) {
  if (logAF.label) {
    items.unshift(logAF.setFormat());
  }
  const start = Date.now();
  return Promise.all(items).then(toLog => {
    if (logAF.duration) {
      const end = Date.now();
      const numberOf = ((end - start) / 1000).toFixed(3);
      toLog.push(`\nin ${numberOf} secs`);
    }
    logAF.wrappedLog(...toLog);
  });
};

Object.defineProperties(logAF, {
  wrappedLog: {value: wrappedLog, writable: true},
  wrappedWarn: {value: wrappedWarn, writable: true},
  setFormat: {value: setFormat, writable: true},
  options: {value: options, writable: true},
});

(logAF.options.reset = function logAfOptionsReset() {
  logAF.label = true;
  logAF.labelFormat = 'file';
  logAF.duration = true;
})();

export default logAF;
