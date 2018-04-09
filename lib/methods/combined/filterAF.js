const filterAF = function (callback, thisArg) {
  return this.then(arr => arr.filter(callback, thisArg));
};

export default filterAF;
