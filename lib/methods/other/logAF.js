import {wrappedLog, wrappedWarn} from '../_internal/logging';

/**
 * logs items to the console in the order given
 *
 * if any items are a promise, they will first be resolved in parallel and then logged
 *
 * ```js
 * import { logAF } from 'async-af'
 *
 * const promise = new Promise(resolve => setTimeout(
 *  () => resolve(2), 1000)
 * );
 *
 * logAF(1, promise, 3);
 * // @filename.js:6:12:
 * // 1 2 3
 * // in 0.998 secs
 * ```
 *
 * **Note:** since logAF returns a promise, the items in the previous example would be logged *after* any synchronous calls to `console.log`
 *
 * to produce in-order logging, `await` logAF:
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
 * // 1
 * // 2
 * // 3
 * ```
 *
 * **experimental feature**: the label may not work correctly in all environments; to turn the label off, set `label` to `false` in `logAF.options`, where you can also change the label's format
 *
 * @param {any} items The items to print (log to the console)
 * @returns {Promise<undefined>} returns a `Promise` that logs items to the console
 * @see log
 * @see logAF.options to turn the label off or change its format
 * @see logAF.reset to reset options to default
 * @since 3.0.0
 * @memberof AsyncAF
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

const setFormat = function setFormat() {
  const error = new Error();
  /* istanbul ignore if */
  if (!error.stack) return '';
  const [targetLine] = error.stack.split`\n`.filter(
    (_, i, lines) => lines[i ? i - 1 : i].includes`logAF (`,
  );
  const fullPath = targetLine.slice(
    targetLine.indexOf`(` + 1,
    targetLine.indexOf`)`,
  );
  const target = fullPath.lastIndexOf`/`;
  const formats = {
    file() {
      return `@${fullPath.slice(target + 1)}:\n`;
    },
    path() {
      return `@${fullPath}:\n`;
    },
    parent() {
      const start = fullPath.slice(0, target).lastIndexOf`/` + 1;
      return `@${fullPath.slice(start)}:\n`;
    },
    arrow() {
      return '========================>';
    },
    custom(format) { /* eslint-disable no-unused-vars, prefer-const, no-eval */
      let [path, line, col] = fullPath.split`:`;
      path = path.split`/`;
      const file = path.pop();
      path = path.join`/`;
      const parent = `${path.split`/`.pop()}/`;
      path += '/';
      const arrow = formats.arrow();
      return eval(format.toString());
    }, /* eslint-enable */
  };
  if (logAF.labelFormat === 'custom') {
    const format = logAF.fullFormat;
    return formats.custom(format.slice(format.indexOf`=` + 1));
  }
  return formats[logAF.labelFormat]();
};

/**
 * Sets logging options for the logAF method
 *
 * accepts an options Object with the following optional properties:
 * - label (Boolean) - set to false to disable logging the location of calls to logAF
 * - duration (Boolean) - set to false to disable logging the time it takes (in secs) to complete each call to logAF
 * - labelFormat (String) - alters the format of logAF labels; choose between file (*default*), path, parent, arrow, or custom
 *
 * ```js
 * const promise = new Promise(resolve => setTimeout(
 *   () => resolve(1), 1000)
 * );
 * ```
 * **default logging**
 * ```js
 * logAF(promise, 2);
 * // @filename.js:212:9:
 * // 1 2
 * // in 0.998 secs
 * ```
 * **turn off label**
 * ```js
 * logAF.options({ label: false });
 * logAF(promise, 2);
 * // 1 2
 * // in 0.999 secs
 * ```
 * **turn off duration**
 * ```js
 * logAF.options({ duration: false });
 * logAF(promise, 2);
 * // @filename.js:212:9:
 * // 1 2
 * ```
 * **change labelFormat**
 * - file (*default*)
 * ```js
 * logAF.options({ labelFormat: file });
 * logAF(promise, 2);
 * // @filename.js:212:9:
 * // 1 2
 * // in 0.998 secs
 * ```
 * - path
 * ```js
 * logAF.options({ labelFormat: path });
 * logAF(promise, 2);
 * // @/Path/to/current/directory/filename.js:212:9:
 * // 1 2
 * // in 0.997 secs
 * ```
 * - parent
 * ```js
 * logAF.options({ labelFormat: parent });
 * logAF(promise, 2);
 * // @parentDirectory/filename.js:213:9:
 * // 1 2
 * // in 0.998 secs
 * ```
 * - arrow
 * ```js
 * logAF.options({ labelFormat: arrow });
 * logAF(promise, 2);
 * // ========================> 1 2
 * // in 0.999 secs
 * ```
 *
 * - custom (create your own labelFormat)
 *  - to set a custom labelFormat, first set it to a String starting with `'custom='`
 *  - after `custom=`, insert your desired format as a String (a String within a String)
 *
 * ```js
 * logAF.options({
 *  labelFormat: 'custom="I logged this:"'
 * });
 * logAF(promise, 2);
 * // I logged this: 1 2
 * // in 1.000 secs
 * ```
 *
 * - your custom format can also access location information as variables, including `file`, `path`, `parent`, `arrow`, `line`, and `col`
 *
 * e.g., to set the labelFormat to `file:line:col =>` you can use template literals
 * ```js
 * logAF.options({
 *  labelFormat: 'custom=`${file}:${line}:${col} =>`'
 * });
 * logAF(promise, 2);
 * // filename.js:212:9 => 1 2
 * // in 0.998 secs
 * ```
 *
 * and just to demonstrate all the location variables in one custom format
 * ```js
 * logAF.options({
 *   labelFormat: 'custom=`${arrow}\nline: ${line}\ncol: ${col}\nparent: ${parent}\nfile: ${file}\npath: ${path}\n`'
 * });
 * logAF(promise, 2);
 * // ========================>
 * // line: 212
 * // col: 9
 * // parent: parentDirectory/
 * // file: filename.js
 * // path: /Full/path/to/the/parentDirectory/
 * // 1 2
 * // in 0.998 secs
 * ```
 *
 * @param {Object} options the options for logAF
 * @param {Boolean} [options.label=true] set to false to turn off the label
 * @param {Boolean} [options.duration=true] set to false to turn off duration
 * @param {String} [options.labelFormat=file] see examples for sample `labelFormat`s
 * @returns {undefined} sets the options for logAF
 * @alias logAF.options
 * @memberof AsyncAF
 */
const options = function logAFOptions(options) {
  if (typeof options.label === 'boolean') logAF.label = options.label;
  if (typeof options.duration === 'boolean') logAF.duration = options.duration;
  if (options.labelFormat) {
    const validFormats = [
      'file',
      'path',
      'parent',
      'arrow',
      'custom',
    ];
    const desiredFormat = options.labelFormat.slice(0, 6);
    if (!validFormats.includes(desiredFormat)) {
      const msg = 'AsyncAF Warning: logAF labelFormat option must be set to \'file\' (default), \'path\', \'parent\', \'arrow\', or \'custom\'';
      logAF.wrappedWarn(msg);
    } else {
      logAF.labelFormat = desiredFormat;
      logAF.fullFormat = options.labelFormat;
    }
  }
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
