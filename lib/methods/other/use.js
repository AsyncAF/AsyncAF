const use = function use(methods) {
  if (typeof methods !== 'object') {
    throw new TypeError('use method accepts an Object containing the methods you\'d like to add to the AsyncAF prototype');
  }
  Object.assign(this.prototype, methods);
};

export default use;
