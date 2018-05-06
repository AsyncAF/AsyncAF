import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('findAF method', () => {
  it('should have the same arity as native find', () => {
    expect(AsyncAF([]).findAF.length).to.equal([].find.length);
    expect(AsyncAF.prototype.findAF.length)
      .to.equal(Array.prototype.find.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 3];
    it('and find and return the first element that satisfies the callback', async () => {
      expect(await AsyncAF(nums).findAF(n => n % 2 === 0)).to.equal(2);
    });
    it('and return undefined if no elements satisfy the callback', async () => {
      expect(await AsyncAF(nums).findAF(n => n === 5)).to.equal(undefined);
    });
    it('and work with the index param', async () => {
      expect(await AsyncAF(nums).findAF((_, i) => i === 2)).to.equal(3);
    });
    it('and work with the array param', async () => {
      expect(await AsyncAF(nums).findAF((n, i, array) => n === array[2])).to.equal(3);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));
    it('and find and return the first element that satisfies the callback', async () => {
      expect(await AsyncAF(nums).findAF(n => n % 2 === 0)).to.equal(2);
    });
    it('and return undefined if no elements satisfy the callback', async () => {
      expect(await AsyncAF(nums).findAF(n => n === 5)).to.equal(undefined);
    });
    it('and work with the index param', async () => {
      expect(await AsyncAF(nums).findAF((_, i) => i === 2)).to.equal(3);
    });
    it('and work with the array param', async () => {
      expect(await AsyncAF(nums).findAF((n, i, array) => n === array[2])).to.equal(3);
    });
  });

  it('should throw TypeError when callback is not a function', () => {
    expect(AsyncAF([]).findAF()).to.eventually.be.rejected.and.have.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should throw TypeError when called on a non-array', async () => {
    expect(AsyncAF({}).findAF(e => e === 1)).to.eventually.be.rejected.and.have.property(
      'message',
      'findAF called on [object Object]; findAF can only be called on an array',
    );
    expect(AsyncAF(null).findAF(e => e === 1)).to.eventually.be.rejected.and.have.property(
      'message',
      'findAF called on null; findAF can only be called on an array',
    );
  });
});
