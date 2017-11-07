const filterAF = function filterAF(fn) {
  return Promise.all([this.mapAF(el => el()), this.mapAF(fn)])
    .then(([values, booleans]) => values.filter((_, i) => !!booleans[i]));
};

module.exports = filterAF;
