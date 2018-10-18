import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('indexOfAF method', () => {
  it('should have the same arity as native indexOf', () => {
    expect(AsyncAF([]).indexOfAF.length)
      .to.equal([].indexOf.length)
      .and.to.equal(''.indexOf.length);
    expect(AsyncAF.prototype.indexOfAF.length)
      .to.equal(Array.prototype.indexOf.length)
      .and.to.equal(String.prototype.indexOf.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and resolve to the first index of the specified element', async () => {
      expect(await AsyncAF(nums).indexOfAF(1)).to.equal(0);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(nums).indexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(nums).indexOfAF(1, 1)).to.equal(-1);
      expect(await AsyncAF(nums).indexOfAF(2, 1)).to.equal(1);
      expect(await AsyncAF(nums).indexOfAF(2, -100)).to.equal(1);
      expect(await AsyncAF(nums).indexOfAF(2, 100)).to.equal(-1);
    });
  });

  context('should work on a string', () => {
    const str = 'test string';
    it('and resolve to the first index of the specified string', async () => {
      expect(await AsyncAF(str).indexOfAF('test')).to.equal(0);
    });
    it('and resolve to -1 if the string doesn\'t include the specified string', async () => {
      expect(await AsyncAF(str).indexOfAF('xyz')).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(str).indexOfAF('test', 5)).to.equal(-1);
      expect(await AsyncAF(str).indexOfAF('string', 5)).to.equal(5);
      expect(await AsyncAF(str).indexOfAF('test string', 100)).to.equal(-1);
      expect(await AsyncAF(str).indexOfAF('test string', -100)).to.equal(0);
    });
  });

  context('should work on an array-like object', () => {
    const arrLike = {0: 1, 1: 2, 2: 4, length: 3};
    it('and resolve to the first index of the specified element', async () => {
      expect(await AsyncAF(arrLike).indexOfAF(2)).to.equal(1);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(arrLike).indexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(arrLike).indexOfAF(1, 1)).to.equal(-1);
      expect(await AsyncAF(arrLike).indexOfAF(2, 1)).to.equal(1);
      expect(await AsyncAF(arrLike).indexOfAF(2, -100)).to.equal(1);
      expect(await AsyncAF(arrLike).indexOfAF(2, 100)).to.equal(-1);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(4)];
    it('and resolve to the first index of the specified element', async () => {
      expect(await AsyncAF(nums).indexOfAF(1)).to.equal(0);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(nums).indexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(nums).indexOfAF(1, 1)).to.equal(-1);
      expect(await AsyncAF(nums).indexOfAF(2, 1)).to.equal(1);
      expect(await AsyncAF(nums).indexOfAF(2, -100)).to.equal(1);
      expect(await AsyncAF(nums).indexOfAF(2, 100)).to.equal(-1);
    });
  });

  context('should work on a promise that resolves to a string', () => {
    const str = Promise.resolve('test string');
    it('and resolve to the first index of the specified string', async () => {
      expect(await AsyncAF(str).indexOfAF('test')).to.equal(0);
    });
    it('and resolve to -1 if the string doesn\'t include the specified string', async () => {
      expect(await AsyncAF(str).indexOfAF('xyz')).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(str).indexOfAF('test', 5)).to.equal(-1);
      expect(await AsyncAF(str).indexOfAF('string', 5)).to.equal(5);
      expect(await AsyncAF(str).indexOfAF('test string', 100)).to.equal(-1);
      expect(await AsyncAF(str).indexOfAF('test string', -100)).to.equal(0);
    });
  });

  context('should work on a promise that resolves to an array-like object', () => {
    const arrLike = Promise.resolve({0: 1, 1: 2, 2: 4, length: 3});
    it('and resolve to the first index of the specified element', async () => {
      expect(await AsyncAF(arrLike).indexOfAF(1)).to.equal(0);
    });
    it('and resolve to -1 if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(arrLike).indexOfAF(5)).to.equal(-1);
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(arrLike).indexOfAF(1, 1)).to.equal(-1);
      expect(await AsyncAF(arrLike).indexOfAF(2, 1)).to.equal(1);
      expect(await AsyncAF(arrLike).indexOfAF(2, -100)).to.equal(1);
      expect(await AsyncAF(arrLike).indexOfAF(2, 100)).to.equal(-1);
    });
  });

  it('should ignore holes in sparse arrays', async () => {
    expect([, , 1].indexOf(undefined)).to.equal(-1);
    expect(await AsyncAF([, , 1]).indexOfAF(undefined)).to.equal(-1);
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).indexOfAF(() => {}).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `indexOfAF cannot be called on ${value}, only on an Array, String, or array-like Object`,
        );
      });
  });
});
