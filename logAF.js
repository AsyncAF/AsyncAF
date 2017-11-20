const logAF = function logAF(...args) {
  const error = new Error();
  if (logAF.label && error.stack) {
    const start = error.stack.lastIndexOf`/` + 1;
    const end = error.stack.indexOf(')', start);
    const lineNum = `@${error.stack.slice(start, end)}:`;
    args.unshift(typeof args[0] === 'object' ? `${lineNum}\n` : lineNum);
  }
  Promise.all(args).then(toLog => console.log(...toLog));
};

logAF.label = true;

logAF.options = function logAFOptions(options) {
  if (options.label === false) logAF.label = false;
};

module.exports = logAF;
