const logAF = function logAF(...args) {
  Promise.all(args).then(toLog => console.log(...toLog));
};

module.exports = logAF;
