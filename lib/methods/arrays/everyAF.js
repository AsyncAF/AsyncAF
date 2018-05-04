const everyAF = function (callback, ...thisArg) {
  return this.then(arr => {
    if (!arr) throw TypeError(`Cannot read property 'everyAF' of ${arr}`);
    if (!Array.isArray(arr)) throw TypeError(`${arr}.everyAF is not a function`);
    return arr.every(callback, thisArg[0]);
  });
};

export default everyAF;
