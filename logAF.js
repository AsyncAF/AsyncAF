const logAF = function logAF(...args) {
  const error = new Error();
  const start = error.stack.lastIndexOf`/` + 1;
  const end = error.stack.indexOf(')', start);
  if (error.stack) args.unshift(`@${error.stack.slice(start, end)}:`);
  Promise.all(args).then(toLog => console.log(...toLog));
};

module.exports = logAF;
