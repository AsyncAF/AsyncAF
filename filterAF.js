const filterAF = function filterAF(fn) {
  return this.then(array => Promise.all([array, array.mapAsync(fn)])
    .then(([arr, mapped]) => arr.filter((v, i) => !!mapped[i])));
};

module.exports = filterAF;
