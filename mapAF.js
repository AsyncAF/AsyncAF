const mapAF = function mapAF(fn) {
  return this.then(array => Promise.all(array.map(fn)));
};

module.exports = mapAF;
