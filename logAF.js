const logAF = function logAF(...args) {
  if (logAF.label) {
    const lineNum = logAF.setFormat(args[0]);
    args.unshift(lineNum);
  }
  Promise.all(args).then((toLog) => {
    // eslint-disable-next-line
    console ? console.log ? console.log(...toLog) : null : null;
  });
};

logAF.label = true;
logAF.labelFormat = 'fileName';

/*
* labelFormat options:
*
* - fileName -
* @fileName.js:line:col: non-object
* @fileName.js:line:col:
* [Object]
*
* - filePath -
* @/Path/to/current/directory/fileName.js:line:col:
* non-object
* @/Path/to/current/directory/fileName.js:line:col:
* [Object]
*
* - parent -
* @parentDirectory/fileName.js:line:col: non-object
* @parentDirectory/fileName.js:line:col:
* [Object]
*
* - fatArrow -
* ========================> non-object
* ========================> [Object]
*/

logAF.setFormat = function setFormat(firstArg) {
  const error = new Error();
  if (!error.stack) return '';
  const newLineForObjs = typeof firstArg === 'object' ? '\n' : '';
  const target = error.stack.lastIndexOf`/`;
  const formats = {
    fileName() {
      const end = error.stack.indexOf(')', target + 1);
      return `@${error.stack.slice(target + 1, end)}:${newLineForObjs}`;
    },
    filePath() {
      const cutoff = error.stack.slice(0, error.stack.indexOf(')', target));
      return `@${cutoff.slice(cutoff.lastIndexOf`(` + 1)}:\n`;
    },
    parent() {
      const end = error.stack.indexOf(')', target);
      const start = error.stack.slice(0, target).lastIndexOf`/` + 1;
      return `@${error.stack.slice(start, end)}:${newLineForObjs}`;
    },
    fatArrow() {
      return '========================>';
    },
  };
  return formats[logAF.labelFormat]();
};

logAF.options = function logAFOptions(options) {
  if (options.label === false) logAF.label = false;
  if (options.labelFormat) {
    const validFormats = ['fileName', 'filePath', 'parent', 'fatArrow'];
    const desiredFormat = options.labelFormat;
    if (!validFormats.includes(desiredFormat)) {
      const msg = 'AsyncAF Warning: logAF labelFormat option must be set to \'fileName\' (default), \'filePath\', \'parent\', or \'fatArrow\'';
      // eslint-disable-next-line
      console ? console.warn ? console.warn(msg) : console.log ? console.log(msg) : null : null;
    } else logAF.labelFormat = desiredFormat;
  }
};

module.exports = logAF;
