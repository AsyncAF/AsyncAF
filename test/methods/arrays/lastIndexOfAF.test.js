import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('lastIndexOfAF method', () => {
  it('should have the same arity as native lastIndexOf', () => {
    expect(AsyncAF([]).lastIndexOfAF.length)
      .to.equal([].lastIndexOf.length)
      .and.to.equal(''.lastIndexOf.length);
    expect(AsyncAF.prototype.lastIndexOfAF.length)
      .to.equal(Array.prototype.lastIndexOf.length)
      .and.to.equal(String.prototype.lastIndexOf.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 1, 2, 2, 3, 3];
    it('and resolve to the last index of the specified element', async () => {
      expect(await AsyncAF(nums).lastIndexOfAF(1)).to.equal(1);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(nums).lastIndexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(nums).lastIndexOfAF(1, 1)).to.equal(1);
      expect(await AsyncAF(nums).lastIndexOfAF(2, 1)).to.equal(-1);
      expect(await AsyncAF(nums).lastIndexOfAF(2, -100)).to.equal(-1);
      expect(await AsyncAF(nums).lastIndexOfAF(2, 100)).to.equal(3);
    });
  });

  context('should work on a string', () => {
    const str = 'test test string string';
    it('and resolve to the last index of the specified string', async () => {
      expect(await AsyncAF(str).lastIndexOfAF('test')).to.equal(5);
    });
    it('and resolve to -1 if the string doesn\'t include the specified string', async () => {
      expect(await AsyncAF(str).lastIndexOfAF('xyz')).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(str).lastIndexOfAF('test', -19)).to.equal(0);
      expect(await AsyncAF(str).lastIndexOfAF('string', -14)).to.equal(-1);
      expect(await AsyncAF(str).lastIndexOfAF('test string', 100)).to.equal(5);
      expect(await AsyncAF(str).lastIndexOfAF('test string', -100)).to.equal(-1);
    });
  });

  context('should work on an array-like object', () => {
    const arrLike = {0: 1, 1: 1, 2: 2, 3: 2, 4: 3, 5: 3, length: 6};
    it('and resolve to the last index of the specified element', async () => {
      expect(await AsyncAF(arrLike).lastIndexOfAF(2)).to.equal(3);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(arrLike).lastIndexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(arrLike).lastIndexOfAF(3, -3)).to.equal(-1);
      expect(await AsyncAF(arrLike).lastIndexOfAF(2, -4)).to.equal(2);
      expect(await AsyncAF(arrLike).lastIndexOfAF(2, -100)).to.equal(-1);
      expect(await AsyncAF(arrLike).lastIndexOfAF(2, 100)).to.equal(3);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 1, 2, 2, 3, 3].map(n => Promise.resolve(n));
    it('and resolve to the last index of the specified element', async () => {
      expect(await AsyncAF(nums).lastIndexOfAF(1)).to.equal(1);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(nums).lastIndexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(nums).lastIndexOfAF(3, -3)).to.equal(-1);
      expect(await AsyncAF(nums).lastIndexOfAF(2, -4)).to.equal(2);
      expect(await AsyncAF(nums).lastIndexOfAF(2, -100)).to.equal(-1);
      expect(await AsyncAF(nums).lastIndexOfAF(2, 100)).to.equal(3);
    });
  });

  context('should work on a promise that resolves to a string', () => {
    const str = Promise.resolve('test string test string');
    it('and resolve to the last index of the specified string', async () => {
      expect(await AsyncAF(str).lastIndexOfAF('test')).to.equal(12);
    });
    it('and resolve to -1 if the string doesn\'t include the specified string', async () => {
      expect(await AsyncAF(str).lastIndexOfAF('xyz')).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(str).lastIndexOfAF('test', -12)).to.equal(0);
      expect(await AsyncAF(str).lastIndexOfAF('string', -20)).to.equal(-1);
      expect(await AsyncAF(str).lastIndexOfAF('test string', 100)).to.equal(12);
      expect(await AsyncAF(str).lastIndexOfAF('string', -100)).to.equal(-1);
    });
  });

  context('should work on a promise that resolves to an array-like object', () => {
    const arrLike = Promise.resolve({0: 1, 1: 1, 2: 2, 3: 2, 4: 3, 5: 3, length: 6});
    it('and resolve to the last index of the specified element', async () => {
      expect(await AsyncAF(arrLike).lastIndexOfAF(3)).to.equal(5);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(arrLike).lastIndexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(arrLike).lastIndexOfAF(3, -3)).to.equal(-1);
      expect(await AsyncAF(arrLike).lastIndexOfAF(2, -4)).to.equal(2);
      expect(await AsyncAF(arrLike).lastIndexOfAF(2, -100)).to.equal(-1);
      expect(await AsyncAF(arrLike).lastIndexOfAF(2, 100)).to.equal(3);
    });
  });

  it('should ignore holes in sparse arrays', async () => {
    expect([, , 1].lastIndexOf(undefined)).to.equal(-1);
    expect(await AsyncAF([, , 1]).lastIndexOfAF(undefined)).to.equal(-1);
  });

  it('should not find the index of NaN', async () => {
    expect([, , NaN, undefined].lastIndexOf(NaN)).to.equal(-1);
    expect(await AsyncAF([, , NaN, undefined]).lastIndexOfAF(NaN)).to.equal(-1);
  });

  it('should find the index of undefined', async () => {
    expect([, , NaN, undefined].lastIndexOf(undefined)).to.equal(3);
    expect(await AsyncAF([, , NaN, undefined]).lastIndexOfAF(undefined)).to.equal(3);
  });

  it('should default fromIndex to length - 1 when undefined or invalid', async () => {
    expect(await AsyncAF([1, 2, 3]).lastIndexOfAF(3, undefined)).to.equal(2);
    expect(AsyncAF([1, 2, 3]).lastIndexOfAF(3, Math)).to.not.eventually.throw;
    expect(await AsyncAF([1, 2, 3]).lastIndexOfAF(3, Math)).to.equal(2);
  });

  it('should resolve to -1 given an empty array', async () => {
    expect([].lastIndexOf(undefined)).to.equal(-1);
    expect(await AsyncAF([]).lastIndexOfAF(undefined)).to.equal(-1);
  });

  it('should handle a large negative fromIndex on an empty array', async () => {
    expect([].lastIndexOf('a', -100)).to.equal(-1);
    expect(await AsyncAF([]).lastIndexOfAF('a', -100)).to.equal(-1);
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).lastIndexOfAF(2).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `lastIndexOfAF cannot be called on ${value}, only on an Array, String, or array-like Object`,
        );
      });
  });
});
