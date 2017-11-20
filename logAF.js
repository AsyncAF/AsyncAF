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

const logAF = function logAF(...args) {
  const error = new Error();
  if (logAF.label && error.stack) {
    let lineNum;
    const newLineForObjs = typeof args[0] === 'object' ? '\n' : '';
    const setFormat = {
      fileName() {
        const start = error.stack.lastIndexOf`/` + 1;
        const end = error.stack.indexOf(')', start);
        lineNum = `@${error.stack.slice(start, end)}:${newLineForObjs}`;
      },
      filePath() {
        const target = error.stack.lastIndexOf`/`;
        const cutoff = error.stack.slice(0, error.stack.indexOf(')', target));
        lineNum = `@${cutoff.slice(cutoff.lastIndexOf`(` + 1)}:\n`;
      },
      parent() {
        const target = error.stack.lastIndexOf`/`;
        const end = error.stack.indexOf(')', target);
        const start = error.stack.slice(0, target).lastIndexOf`/` + 1;
        lineNum = `@${error.stack.slice(start, end)}:${newLineForObjs}`;
      },
      fatArrow() {
        lineNum = '========================>';
      },
    };
    setFormat[logAF.labelFormat]();
    args.unshift(lineNum);
  }
  Promise.all(args).then(toLog => console.log(...toLog));
};

logAF.label = true;
logAF.labelFormat = 'fileName';

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
