const includesAF = function (searchItem, fromIndex = 0) {
  return this.then(arrOrStr => {
    // eslint-disable-next-line curly
    if (arrOrStr == null || arrOrStr.length == null || typeof arrOrStr === 'function')
      throw TypeError(
        `includesAF cannot be called on ${arrOrStr}, only on an Array, String, or array-like Object`,
      );
    return (typeof arrOrStr === 'string' ? String : Array)
      .prototype.includes.call(arrOrStr, searchItem, fromIndex);
  });
};

export default includesAF;
