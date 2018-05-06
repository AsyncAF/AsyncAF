import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('findIndexAF method', () => {
  it('should have the same arity as native findIndex', () => {
    expect(AsyncAF([]).findIndexAF.length).to.equal([].findIndex.length);
    expect(AsyncAF.prototype.findIndexAF.length)
      .to.equal(Array.prototype.findIndex.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 3];
    it('and find and return the first element that satisfies the callback', async () => {
      expect(await AsyncAF(nums).findIndexAF(n => n % 2 === 0)).to.equal(1);
    });
    it('and return undefined if no elements satisfy the callback', async () => {
      expect(await AsyncAF(nums).findIndexAF(n => n === 5)).to.equal(-1);
    });
    it('and work with the index param', async () => {
      expect(await AsyncAF(nums).findIndexAF((_, i) => i === 2)).to.equal(2);
    });
    it('and work with the array param', async () => {
      expect(await AsyncAF(nums).findIndexAF((n, i, array) => n === array[2])).to.equal(2);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));
    it('and find and return the first element that satisfies the callback', async () => {
      expect(await AsyncAF(nums).findIndexAF(n => n % 2 === 0)).to.equal(1);
    });
    it('and return undefined if no elements satisfy the callback', async () => {
      expect(await AsyncAF(nums).findIndexAF(n => n === 5)).to.equal(-1);
    });
    it('and work with the index param', async () => {
      expect(await AsyncAF(nums).findIndexAF((_, i) => i === 2)).to.equal(2);
    });
    it('and work with the array param', async () => {
      expect(await AsyncAF(nums).findIndexAF((n, i, array) => n === array[2])).to.equal(2);
    });
  });

  it('should throw TypeError when callback is not a function', () => {
    expect(AsyncAF([]).findIndexAF()).to.eventually.be.rejected.and.have.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should throw TypeError when called on a non-array', async () => {
    expect(AsyncAF({}).findIndexAF(e => e === 1)).to.eventually.be.rejected.and.have.property(
      'message',
      'findIndexAF called on [object Object]; findIndexAF can only be called on an array',
    );
    expect(AsyncAF(null).findIndexAF(e => e === 1)).to.eventually.be.rejected.and.have.property(
      'message',
      'findIndexAF called on null; findIndexAF can only be called on an array',
    );
  });
});
