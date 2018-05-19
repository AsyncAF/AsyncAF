const splitAF = function (separator = undefined, limit = undefined) {
  return this.then(str => {
    if (typeof str !== 'string' || Array.isArray(str))
      throw TypeError(`splitAF may be called on a string but was called on ${str}`);
    return String.prototype.split.call(str, separator, limit);
  });
};

export default splitAF;
