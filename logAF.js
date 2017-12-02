/**
 * - Logs items to the console
 * - if an item is a promise, logAF will first resolve the promise then log its value
 *
 * Example:
 * ```javascript
 * const {logAF} = require('async-af');
 *
 * const promise = () => new Promise(resolve => setTimeout(() => resolve(1), 1000));
 *
 * logAF(promise(), 2);
 * // @filename.js:212:9: 1 2
 * // in 0.998 secs
 * ```
 * **Note:** The label may not work correctly
 * in all environments; to turn the label off, set label to false
 * in logAF options, where you can also change the label's format.
 *
 * @since 1.3.0
 * @param {*} items The items to print (log to the console)
 * @see logAF.options to turn the label off or change its format
 */

const logAF = function logAF(...items) {
  const start = Date.now();
  if (logAF.label) {
    let firstItem;
    // eslint-disable-next-line no-return-assign
    Promise.resolve(items[0]).then(item => firstItem = item);
    const lineNum = logAF.setFormat(firstItem);
    items.unshift(lineNum);
  } else {
    items.unshift('');
  }
  Promise.all(items).then((toLog) => {
    if (logAF.duration) {
      const end = Date.now();
      const numberOf = ((end - start) / 1000).toFixed(3);
      toLog.push(`\nin ${numberOf} secs`);
    }
    // eslint-disable-next-line
    console ? console.log ? console.log(...toLog) : null : null;
  });
};

logAF.label = true;
logAF.labelFormat = 'file';
logAF.duration = true;

/*
* labelFormat options:
*
* - file -
* @file.js:line:col: non-object
* @file.js:line:col:
* [Object]
*
* - path -
* @/Path/to/current/directory/file.js:line:col:
* non-object
* @/Path/to/current/directory/file.js:line:col:
* [Object]
*
* - parent -
* @parentDirectory/file.js:line:col: non-object
* @parentDirectory/file.js:line:col:
* [Object]
*
* - arrow -
* ========================> non-object
* ========================> [Object]
*/

logAF.setFormat = function setFormat(firstArg) {
  const error = new Error();
  if (!error.stack) return '';
  const newLineForObjs = typeof firstArg === 'object' ? '\n' : '';
  let target = error.stack.lastIndexOf`/`;
  // to avoid next_tick.js filename:
  if (error.stack.slice(target).includes`next_tick`) {
    error.stack = error.stack.split`\n`.slice(0, 4).join`\n`;
    target = error.stack.lastIndexOf`/`;
  }
  const formats = {
    file() {
      const end = error.stack.indexOf(')', target + 1);
      return `@${error.stack.slice(target + 1, end)}:${newLineForObjs}`;
    },
    path() {
      const cutoff = error.stack.slice(0, error.stack.indexOf(')', target));
      return `@${cutoff.slice(cutoff.lastIndexOf`(` + 1)}:\n`;
    },
    parent() {
      const end = error.stack.indexOf(')', target);
      const start = error.stack.slice(0, target).lastIndexOf`/` + 1;
      return `@${error.stack.slice(start, end)}:${newLineForObjs}`;
    },
    arrow() {
      return '========================>';
    },
    custom(format) { /* eslint-disable no-unused-vars, prefer-const, no-eval */
      const location = formats.path().slice(1).split`:`;
      let [path, line, col] = location;
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
 * Sets logging options for the logAF method;
 * accepts an options Object with the following optional properties:
 * - label (Boolean) - set to false to disable logging the location of calls to logAF
 * - duration (Boolean) - set to false to disable logging the time it takes (in secs) to complete each call to logAF
 * - labelFormat (String) - alters the format of logAF labels; choose between file (default), path, parent, arrow, or custom
 *
 * **For example:**
 * ```javascript
 * const {logAF} = require('async-af');
 *
 * const promise = () => new Promise(resolve => setTimeout(() => resolve(1), 1000));
 * ```
 * **default logging**
 * ```javascript
 * logAF(promise(), 2);
 * // @filename.js:212:9: 1 2
 * // in 0.998 secs
 * ```
 * **turn off label**
 * ```javascript
 * logAF.options({ label: false });
 * logAF(promise(), 2);
 * //  1 2
 * // in 0.999 secs
 * ```
 * **turn off duration**
 * ```javascript
 * logAF.options({ duration: false });
 * logAF(promise(), 2);
 * // @filename.js:212:9: 1 2
 * ```
 * **change labelFormat**
 * file (default)
 * ```javascript
 * logAF.options({ labelFormat: file });
 * logAF(promise(), 2);
 * // @filename.js:212:9: 1 2
 * // in 0.998 secs
 * ```
 * path
 * ```javascript
 * logAF.options({ labelFormat: path });
 * logAF(promise(), 2);
 * // @/Path/to/current/directory/filename.js:212:9:
 * // 1 2
 * // in 0.997 secs
 * ```
 * parent
 * ```javascript
 * logAF.options({ labelFormat: parent });
 * logAF(promise(), 2);
 * // @parentDirectory/filename.js:213:9: 1 2
 * // in 0.998 secs
 * ```
 * arrow
 * ```javascript
 * logAF.options({ labelFormat: arrow });
 * logAF(promise(), 2);
 * // ========================> 1 2
 * // in 0.999 secs
 * ```
 * custom (create your own labelFormat)
 * - to set a custom labelFormat, first set it to a String starting with `'custom='`
 * - after `custom=`, insert your desired format as a String
 * (a String within a String)
 *
 * ```javascript
 * logAF.options({ labelFormat: 'custom="I logged this:"' });
 * logAF(promise(), 2);
 * // I logged this: 1 2
 * // in 1.000 secs
 * ```
 *
 * - your custom format can also access location information as variables, including
 * `file`, `path`, `parent`, and `arrow`
 *
 * e.g., to set the labelFormat to `file:line:col =>` you can use template literals
 * ```javascript
 * logAF.options({ labelFormat: 'custom=`${file}:${line}:${col} =>`' });
 * logAF(promise(), 2);
 * // filename.js:212:9 => 1 2
 * // in 0.998 secs
 * ```
 *
 * and just to demonstrate all the location variables in one custom format
 * ```javascript
 * logAF.options({
 *   labelFormat: 'custom=`${arrow}\nline: ${line}\ncol: ${col}\nparent: ${parent}\nfile: ${file}\npath: ${path}`'
 * });
 * // ========================>
 * // line: 212
 * // col: 9
 * // parent: parentDirectory/
 * // file: filename.js
 * // path: /Path/to/current/directory/ 1 2
 * // in 0.998 secs
 * ```
 *
 * @param {Object} options - the options for logAF
 * @param {Boolean} [options.label]
 * @param {Boolean} [options.duration=true]
 * @param {string} [options.labelFormat=file]
 */

logAF.options = function logAFOptions(options) {
  if (options.label === false) logAF.label = false;
  if (options.duration === false) logAF.duration = false;
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
      // eslint-disable-next-line
      console ? console.warn ? console.warn(msg) : console.log ? console.log(msg) : null : null;
    } else {
      logAF.labelFormat = desiredFormat;
      logAF.fullFormat = options.labelFormat;
    }
  }
};

module.exports = logAF;
