const mapAF = function (callback, thisArg) {
  return this.then(arr => arr.map(callback, thisArg));
};

export default mapAF;
