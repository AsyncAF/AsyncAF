const nameFunction = function (fn, name) {
  return Object.defineProperty(fn,'name', {value: name, configurable: true});
};

export default nameFunction;
