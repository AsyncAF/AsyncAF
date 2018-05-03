const reduceAF = function(callback, initialValue = null) {
  return this.then(arr => {
    if (!arr) throw TypeError(`Cannot read property 'reduceAF' of ${arr}`);
    if (!Array.isArray(arr)) throw TypeError(`${arr}.reduceAF is not a function`);
    if (!arr.length && initialValue === null)
      throw TypeError('reduceAF of empty array with no initial value');
    return arr.reduce(callback, initialValue)
  });
};

export default reduceAF;
