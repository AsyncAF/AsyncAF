const someAF = function (callback, ...thisArg) {
  return this.then(arr => {
    if (!arr) throw TypeError(`Cannot read property 'someAF' of ${arr}`);
    if (!Array.isArray(arr)) throw TypeError(`${arr}.someAF is not a function`);
    return arr.some(callback, thisArg[0]);
  });
};

export default someAF;
