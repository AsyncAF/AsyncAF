const inSeries = new WeakMap();

const series = {
  inSeries: {
    get() {
      return inSeries.get(this);
    },
  },
  /**
   * indicates that the next method invoked should be performed in series
   *
   * when you need to perform a method in series rather than in parallel, prepend the method with `series`; e.g.:
   * ```js
   * AsyncAF(promises).series.forEachAF(callback)
   * ```
   *
   * `series` can currently be chained with:
   * - {@link AsyncAF#everyAF everyAF}
   * - {@link AsyncAF#filterAF filterAF}
   * - {@link AsyncAF#findAF findAF}
   * - {@link AsyncAF#findIndexAF findIndexAF}
   * - {@link AsyncAF#forEachAF forEachAF}
   * - {@link AsyncAF#includesAF includesAF}
   * - {@link AsyncAF#indexOfAF indexOfAF}
   * - {@link AsyncAF#lastIndexOfAF lastIndexOfAF}
   * - {@link AsyncAF#mapAF mapAF}
   *
   * @example
   * import delay from 'delay'; // {@link https://www.npmjs.com/package/delay}
   *
   * const nums = [2, 1];
   *
   * // perform a serial forEach by chaining {@link AsyncAF#series series} and {@link AsyncAF#forEachAF forEachAF}
   * (async () => {
   *   const start = Date.now();
   *
   *   await AsyncAF(nums).series.forEachAF(async num => {
   *     await delay(num * 1000);
   *     console.log(num, `at ~${Date.now() - start} ms`);
   *   });
   *
   *   console.log(`total: ~${Date.now() - start} ms`);
   * })();
   *
   * // logs:
   * // 2  'at ~2000 ms'
   * // 1  'at ~3000 ms'
   * // total: ~3000 ms
   *
   *
   * // perform a parallel forEach by omitting {@link AsyncAF#series series}
   * (async () => {
   *   const start = Date.now();
   *
   *   await AsyncAF(nums).forEachAF(async num => {
   *     await delay(num * 1000);
   *     console.log(num, `at ~${Date.now() - start} ms`);
   *   });
   *
   *   console.log(`total: ~${Date.now() - start} ms`);
   * })();
   *
   * // logs:
   * // 1  'at ~1000 ms'
   * // 2  'at ~2000 ms'
   * // total: ~2000 ms
   *
   * @function series
   * @returns {AsyncAF.<any>} returns an instance of AsyncAF that will perform the next method invocation serially
   * @since 7.0.0
   * @see {@link AsyncAF#io io} (alias)
   * @memberof AsyncAF#
   */
  series: {
    get() {
      inSeries.set(this, !this.inSeries);
      return this;
    },
  },
  /**
   * `io` (in order) indicates that the next method invoked should be performed in series
   *
   * when you need to perform a method in series rather than in parallel, prepend the method with `io`; e.g.:
   * ```js
   * AsyncAF(promises).io.forEachAF(callback)
   * ```
   *
   * `io` is an alias for `series`; see {@link AsyncAF#series series's documentation} for more
   * @function io
   * @returns {AsyncAF.<any>} returns an instance of AsyncAF that will perform the next method invocation serially
   * @since 7.0.0
   * @see {@link AsyncAF#series series} (alias)
   * @memberof AsyncAF#
   */
  io: {
    get() {
      return this.series;
    },
  },
};

export default series;
