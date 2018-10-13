import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('includesAF method', () => {
  it('should have the same arity as native includes', () => {
    expect(AsyncAF([]).includesAF.length)
      .to.equal([].includes.length)
      .and.to.equal(''.includes.length);
    expect(AsyncAF.prototype.includesAF.length)
      .to.equal(Array.prototype.includes.length)
      .and.to.equal(String.prototype.includes.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and return true if the array includes the specified element', async () => {
      expect(await AsyncAF(nums).includesAF(1)).to.be.true;
    });
    it('and return false if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(nums).includesAF(5)).to.be.false;
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(nums).includesAF(1, 1)).to.be.false;
      expect(await AsyncAF(nums).includesAF(2, 1)).to.be.true;
      expect(await AsyncAF(nums).includesAF(2, -100)).to.be.true;
      expect(await AsyncAF(nums).includesAF(2, 100)).to.be.false;
    });
  });

  context('should work on a string', () => {
    const str = 'test string';
    it('and return true if the string includes the specified string', async () => {
      expect(await AsyncAF(str).includesAF('test')).to.be.true;
    });
    it('and return false if the string doesn\'t include the specified string', async () => {
      expect(await AsyncAF(str).includesAF('xyz')).to.be.false;
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(str).includesAF('test', 5)).to.be.false;
      expect(await AsyncAF(str).includesAF('string', 5)).to.be.true;
      expect(await AsyncAF(str).includesAF('test string', 100)).to.be.false;
      expect(await AsyncAF(str).includesAF('test string', -100)).to.be.true;
    });
  });

  context('should work on an array-like object', () => {
    const arrLike = {0: 1, 1: 2, 2: 4, length: 3};
    it('and return true if the array includes the specified element', async () => {
      expect(await AsyncAF(arrLike).includesAF(1)).to.be.true;
    });
    it('and return false if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(arrLike).includesAF(5)).to.be.false;
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(arrLike).includesAF(1, 1)).to.be.false;
      expect(await AsyncAF(arrLike).includesAF(2, 1)).to.be.true;
      expect(await AsyncAF(arrLike).includesAF(2, -100)).to.be.true;
      expect(await AsyncAF(arrLike).includesAF(2, 100)).to.be.false;
    });
  });

  context('should work on an array of promises', () => {
    const nums = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(4)];
    it('and return true if the array includes the specified element', async () => {
      expect(await AsyncAF(nums).includesAF(1)).to.be.true;
    });
    it('and return false if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(nums).includesAF(5)).to.be.false;
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(nums).includesAF(1, 1)).to.be.false;
      expect(await AsyncAF(nums).includesAF(2, 1)).to.be.true;
      expect(await AsyncAF(nums).includesAF(2, -100)).to.be.true;
      expect(await AsyncAF(nums).includesAF(2, 100)).to.be.false;
    });
  });

  context('should work on a promise that resolves to a string', () => {
    const str = Promise.resolve('test string');
    it('and return true if the string includes the specified string', async () => {
      expect(await AsyncAF(str).includesAF('test')).to.be.true;
    });
    it('and return false if the string doesn\'t include the specified string', async () => {
      expect(await AsyncAF(str).includesAF('xyz')).to.be.false;
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(str).includesAF('test', 5)).to.be.false;
      expect(await AsyncAF(str).includesAF('string', 5)).to.be.true;
      expect(await AsyncAF(str).includesAF('test string', 100)).to.be.false;
      expect(await AsyncAF(str).includesAF('test string', -100)).to.be.true;
    });
  });

  context('should work on a promise that resolves to an array-like object', () => {
    const arrLike = Promise.resolve({0: 1, 1: 2, 2: 4, length: 3});
    it('and return true if the array includes the specified element', async () => {
      expect(await AsyncAF(arrLike).includesAF(1)).to.be.true;
    });
    it('and return false if the array doesn\'t include the specified element', async () => {
      expect(await AsyncAF(arrLike).includesAF(5)).to.be.false;
    });
    it('and work with fromIndex specified', async () => {
      expect(await AsyncAF(arrLike).includesAF(1, 1)).to.be.false;
      expect(await AsyncAF(arrLike).includesAF(2, 1)).to.be.true;
      expect(await AsyncAF(arrLike).includesAF(2, -100)).to.be.true;
      expect(await AsyncAF(arrLike).includesAF(2, 100)).to.be.false;
    });
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).includesAF(2).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `includesAF cannot be called on ${value}, only on an Array, String, or array-like Object`,
        );
      });
  });
});
