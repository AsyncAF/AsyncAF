import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import AsyncAF from '../../dist/async-af/async-af';

chai.use(chaiAsPromised);

describe('filterAF method', () => {
  it('should have the same arity as native filter', () => {
    expect(AsyncAF([]).filterAF.length).to.equal([].filter.length);
    expect(AsyncAF.prototype.filterAF.length)
      .to.equal(Array.prototype.filter.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).filterAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return an Array', async () => {
      expect(await AsyncAF(nums).filterAF(n => n % 2)).to.be.an.instanceOf(Array);
    });
    it('and filter the new Array\'s elements', async () => {
      expect(await AsyncAF(nums).filterAF(n => n % 2)).to.eql([1]);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [
      new Promise(resolve => resolve(1)),
      new Promise(resolve => resolve(2)),
      new Promise(resolve => resolve(4)),
    ];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).filterAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return an Array', async () => {
      expect(await AsyncAF(nums).filterAF(n => n % 2)).to.be.an.instanceOf(Array);
    });
    it('and filter the new Array\'s elements', async () => {
      expect(await AsyncAF(nums).filterAF(n => n % 2)).to.eql([1]);
    });
  });

  context('should work on an array of Promise.resolve calls', () => {
    const nums = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(4)];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).forEachAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return an Array', async () => {
      expect(await AsyncAF(nums).filterAF(n => n % 2)).to.be.an.instanceOf(Array);
    });
    it('and filter the new Array\'s elements', async () => {
      expect(await AsyncAF(nums).filterAF(n => n % 2)).to.eql([1]);
    });
  });

  context('should process elements in order and in parallel', () => {
    const clock = sinon.useFakeTimers();
    const nums = [
      new Promise(resolve => setTimeout(() => resolve(1), 2000)),
      new Promise(resolve => setTimeout(() => resolve(2), 1000)),
      new Promise(resolve => setTimeout(() => resolve(4), 0)),
    ];
    clock.tick(2000); // tick exactly 2000 to be sure elements are processed in parallel
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).filterAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and work with indices/array arguments', async () => {
      const result = [];
      await AsyncAF(nums).filterAF(async (num, i, arr) => {
        result.push(num + (await arr[i - 1] || 0));
      });
      expect(result).to.eql([1, 3, 6]);
    });
    clock.restore();
  });

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).filterAF()).to.eventually.be.rejected.and.has.property(
      'message',
      'undefined is not a function',
    );
  });
});
