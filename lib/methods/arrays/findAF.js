const findAF = function (callback, ...thisArg) {
  return this.then(arr => arr.find(callback, thisArg[0]));
};

export default findAF;
