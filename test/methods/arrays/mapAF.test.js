const {expect} = require('chai');

const AsyncAF = require('../../../dist/async-af');

describe('mapAF method', () => {
  it('should have the same arity as native map', () => {
    expect(AsyncAF([]).mapAF.length).to.equal([].map.length);
    expect(AsyncAF.prototype.mapAF.length)
      .to.equal(Array.prototype.map.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 3, 4];
    it('and return an instance of Array', async () => {
      expect(await AsyncAF(nums).mapAF(num => num * 2)).to.be.an.instanceOf(Array);
    });
    it('and map its elements', async () => {
      expect(await AsyncAF(nums).mapAF(num => num * 2)).to.eql([2, 4, 6, 8]);
    });
    it('and be chainable', async () => {
      expect(await AsyncAF(nums).mapAF(num => num).mapAF(num => num * 2))
        .to.eql([2, 4, 6, 8]);
    });
  });

  context('should work on an array of promises', () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    const p3 = Promise.resolve(3);
    it('should return an instance of Array', async () => {
      expect(await AsyncAF([p1, p2, p3]).mapAF(num => num * 2)).to.be.an.instanceOf(Array);
    });
    it('and map its resolved elements', async () => {
      expect(await AsyncAF([p1, p2, p3]).mapAF(num => num * 2)).to.eql([2, 4, 6]);
    });
    it('and be chainable', async () => {
      expect(await AsyncAF([p1, p2, p3]).mapAF(num => num).mapAF(num => num * 2))
        .to.eql([2, 4, 6]);
    });
  });

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).mapAF()).to.eventually.be.rejected.and.has.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should reject with TypeError when called on non-array-like objects', async () => {
    await expect(AsyncAF(null).mapAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'mapAF cannot be called on null, only on an Array or array-like Object',
    );
    await expect(AsyncAF().mapAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'mapAF cannot be called on undefined, only on an Array or array-like Object',
    );
    await expect(AsyncAF({}).mapAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'mapAF cannot be called on [object Object], only on an Array or array-like Object',
    );
    await expect(AsyncAF(true).mapAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'mapAF cannot be called on true, only on an Array or array-like Object',
    );
    await expect(AsyncAF(2).mapAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'mapAF cannot be called on 2, only on an Array or array-like Object',
    );
  });
});
