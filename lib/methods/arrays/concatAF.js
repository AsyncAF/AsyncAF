const concatAF = function (...values) {
  return this.then(arrOrStr => {
    if (!(typeof arrOrStr === 'string' || Array.isArray(arrOrStr))) throw TypeError(
      `concatAF cannot be called on ${arrOrStr}, only on an Array or String`,
    );
    return values.reduce((arrOrStr, value) =>
      arrOrStr instanceof Promise
        ? arrOrStr.then(arrOrStr =>
          value instanceof this.constructor || value instanceof Promise
            ? value.then(value => arrOrStr.concat(value))
            : arrOrStr.concat(value), arrOrStr)
        : value instanceof this.constructor || value instanceof Promise
          ? value.then(value => arrOrStr.concat(value))
          : arrOrStr.concat(value), arrOrStr);
  });
};

export default concatAF;
