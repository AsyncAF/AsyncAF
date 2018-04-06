/**
 * use `.value()` at the end of a chain when you'd like to unwrap it and the return value is not a primitive
 * - this is not necessary when the final method already returns a primitive
 *
 * Example:
 * ```javascript
 * // since the inner value is an Array (not a primitive), end the chain with `.value()`
 * AsyncAF([1, 2, 3]).map(n => n * 2).value();
 * // [2, 4, 6]
 * ```
 * @returns {*} the unwrapped value
 * @since 3.0.0
 *
 */
const value = function value() {
  return this.innerVal;

  // await this;
  // return this.innerVal;

  // return this.then(() => this.innerVal);
};

export default value;
