/**
 * - Logs items to the console; if an item is a promise,
 * logAF will first resolve the promise then log its value.
 *
 * - **Note:** The label (file:line:col) may not work correctly
 * in all environments; to turn the label off, set label to false
 * in logAF options, where you can also change the label's format.
 *
 * @since 1.3.0
 * @param {*} items The items to print (log to the console)
 * @see logAF.options to turn the label off or change its format
 */

const logAF = function logAF(...items) {
  if (logAF.label) {
    const lineNum = logAF.setFormat(items[0]);
    items.unshift(lineNum);
  }
  Promise.all(items).then((toLog) => {
    // eslint-disable-next-line
    console ? console.log ? console.log(...toLog) : null : null;
  });
};

logAF.label = true;
logAF.labelFormat = 'file';

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
  const target = error.stack.lastIndexOf`/`;
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

logAF.options = function logAFOptions(options) {
  if (options.label === false) logAF.label = false;
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
