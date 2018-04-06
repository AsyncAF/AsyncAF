const {expect} = require('chai');

const AsyncAF = require('../../dist/async-af.modern');

describe('mapAF method', () => {
  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 3, 4];
    it('and return an instance of AsyncAF', async () => {
      expect(await AsyncAF(nums).mapAF(num => num * 2)).to.be.an.instanceOf(AsyncAF);
    });
    it('and map its elements', async () => {
      expect(await AsyncAF(nums).mapAF(num => num * 2)).to.eql(AsyncAF([2, 4, 6, 8]));
    });
    it('and be chainable', async () => {
      expect(await (await AsyncAF(nums).mapAF(num => num)).mapAF(num => num * 2))
        .to.eql(await AsyncAF([2, 4, 6, 8]));
    });
    it('and return an array when extracting the value', async () => {
      expect((await AsyncAF(nums).mapAF(num => num * 2)).value()).to.eql([2, 4, 6, 8]);
    });
  });

  context('should work on an array of promises', () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    const p3 = Promise.resolve(3);
    it('should return an instance of AsyncAF', async () => {
      expect(await AsyncAF([p1, p2, p3]).mapAF(num => num * 2)).to.be.an.instanceOf(AsyncAF);
    });
    it('and map its resolved elements', async () => {
      expect(await AsyncAF([p1, p2, p3]).mapAF(num => num * 2)).to.eql(AsyncAF([2, 4, 6]));
    });
    it('and be chainable', async () => {
      expect(await (await AsyncAF([p1, p2, p3]).mapAF(num => num)).mapAF(num => num * 2))
        .to.eql(AsyncAF([2, 4, 6]));
    });
    it('and return an array when extracting the value', async () => {
      expect((await AsyncAF([p1, p2, p3]).mapAF(num => num * 2)).value()).to.eql([2, 4, 6]);
    });
  });
});
