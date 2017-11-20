const logAF = function logAF(...args) {
  const error = new Error();
  if (logAF.label && error.stack) {
    let lineNum;
    const setFormat = {
      fileName() {
        const start = error.stack.lastIndexOf`/` + 1;
        const end = error.stack.indexOf(')', start);
        lineNum = `@${error.stack.slice(start, end)}:`;
      },
      filePath() {
        const target = error.stack.lastIndexOf`/`;
        const cutoff = error.stack.slice(0, error.stack.indexOf(')', target));
        const newLineForPaths = typeof args[0] !== 'object' ? '\n' : '';
        lineNum = `@${cutoff.slice(cutoff.lastIndexOf`(` + 1)}:${newLineForPaths}`;
      },
    };
    setFormat[logAF.labelFormat]();
    args.unshift(typeof args[0] === 'object' ? `${lineNum}\n` : lineNum);
  }
  Promise.all(args).then(toLog => console.log(...toLog));
};

logAF.label = true;
logAF.labelFormat = 'fileName';

logAF.options = function logAFOptions(options) {
  if (options.label === false) logAF.label = false;
  if (options.labelFormat) {
    const validFormats = ['fileName', 'filePath', 'parent'];
    const desiredFormat = options.labelFormat;
    if (!validFormats.includes(desiredFormat)) {
      const msg = 'AsyncAF Warning: logAF labelFormat option must be set to \'fileName\' (default), \'filePath\', or \'parent\'';
      // eslint-disable-next-line
      console ? console.warn ? console.warn(msg) : console.log ? console.log(msg) : null : null;
    } else logAF.labelFormat = desiredFormat;
  }
};

module.exports = logAF;
