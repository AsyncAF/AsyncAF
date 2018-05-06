const findIndexAF = function (callback, thisArg = undefined) {
  return this.then(arr => {
    if (!Array.isArray(arr)) throw TypeError(`findIndexAF called on ${arr}; findIndexAF can only be called on an array`);
    return arr.findIndex(callback, thisArg);
  });
};

export default findIndexAF;
