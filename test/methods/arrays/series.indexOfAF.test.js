import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('series.indexOfAF method', () => {
  it('io (inOrder) should be an alias for series', () => {
    expect(AsyncAF().io).to.eql(AsyncAF().series);
    expect(AsyncAF().io.indexOfAF).to.equal(AsyncAF().series.indexOfAF);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and resolve to the first index of the specified element', async () => {
      expect(await AsyncAF(nums).io.indexOfAF(1)).to.equal(0);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(nums).io.indexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(nums).io.indexOfAF(1, 1)).to.equal(-1);
      expect(await AsyncAF(nums).io.indexOfAF(2, 1)).to.equal(1);
      expect(await AsyncAF(nums).io.indexOfAF(2, -100)).to.equal(1);
      expect(await AsyncAF(nums).io.indexOfAF(2, 100)).to.equal(-1);
    });
  });

  context('should work on an array-like object', () => {
    const arrLike = {0: 1, 1: 2, 2: 4, length: 3};
    it('and resolve to the first index of the specified element', async () => {
      expect(await AsyncAF(arrLike).io.indexOfAF(2)).to.equal(1);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(arrLike).io.indexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(arrLike).io.indexOfAF(1, 1)).to.equal(-1);
      expect(await AsyncAF(arrLike).io.indexOfAF(2, 1)).to.equal(1);
      expect(await AsyncAF(arrLike).io.indexOfAF(2, -100)).to.equal(1);
      expect(await AsyncAF(arrLike).io.indexOfAF(2, 100)).to.equal(-1);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    it('and resolve to the first index of the specified element', async () => {
      expect(await AsyncAF(nums).io.indexOfAF(1)).to.equal(0);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(nums).io.indexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(nums).io.indexOfAF(1, 1)).to.equal(-1);
      expect(await AsyncAF(nums).io.indexOfAF(2, 1)).to.equal(1);
      expect(await AsyncAF(nums).io.indexOfAF(2, -100)).to.equal(1);
      expect(await AsyncAF(nums).io.indexOfAF(2, 100)).to.equal(-1);
    });
  });

  context('should work on a promise that resolves to an array-like object', () => {
    const arrLike = Promise.resolve({0: 1, 1: 2, 2: 4, length: 3});
    it('and resolve to the first index of the specified element', async () => {
      expect(await AsyncAF(arrLike).io.indexOfAF(1)).to.equal(0);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(arrLike).io.indexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(arrLike).io.indexOfAF(1, 1)).to.equal(-1);
      expect(await AsyncAF(arrLike).io.indexOfAF(2, 1)).to.equal(1);
      expect(await AsyncAF(arrLike).io.indexOfAF(2, -100)).to.equal(1);
      expect(await AsyncAF(arrLike).io.indexOfAF(2, 100)).to.equal(-1);
    });
  });

  it('should ignore holes in sparse arrays', async () => {
    expect([, , 1].indexOf(undefined)).to.equal(-1);
    expect(await AsyncAF([, , 1]).io.indexOfAF(undefined)).to.equal(-1);
  });

  it('should not find the index of NaN', async () => {
    expect([, , NaN, undefined].indexOf(NaN)).to.equal(-1);
    expect(await AsyncAF([, , NaN, undefined]).io.indexOfAF(NaN)).to.equal(-1);
  });

  it('should find the index of undefined', async () => {
    expect([, , NaN, undefined].indexOf(undefined)).to.equal(3);
    expect(await AsyncAF([, , NaN, undefined]).io.indexOfAF(undefined)).to.equal(3);
  });

  it('should default fromIndex to 0 when undefined or invalid', async () => {
    expect(await AsyncAF([1, 2, 3]).io.indexOfAF(1, undefined)).to.equal(0);
    expect(AsyncAF([1, 2, 3]).io.indexOfAF(1, Math)).to.not.eventually.throw;
    expect(await AsyncAF([1, 2, 3]).io.indexOfAF(1, Math)).to.equal(0);
  });

  it('should always resolve to -1 given a fromIndex of an array\'s length', async () => {
    expect([1, 2, 3].indexOf(3, 3)).to.equal(-1);
    expect(await AsyncAF([1, 2, 3]).io.indexOfAF(3, 3)).to.equal(-1);
  });

  it('should resolve to -1 given an empty array', async () => {
    expect([].indexOf(undefined)).to.equal(-1);
    expect(await AsyncAF([]).io.indexOfAF(undefined)).to.equal(-1);
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).io.indexOfAF(() => {}).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `indexOfAF cannot be called on ${value}, only on an Array, String, or array-like Object`,
        );
      });
  });
});
