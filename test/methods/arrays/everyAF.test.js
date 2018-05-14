import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('everyAF method', () => {
  it('should have the same arity as native every', () => {
    expect(AsyncAF([]).everyAF.length).to.equal([].every.length);
    expect(AsyncAF.prototype.everyAF.length)
      .to.equal(Array.prototype.every.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).everyAF(num => {
        numsTimes2.push(num * 2);
        return true;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return false when any result is falsey', async () => {
      expect(await AsyncAF(nums).everyAF(n => n % 2)).to.be.false;
    });
    it('and return true when all results are truthy', async () => {
      expect(await AsyncAF(nums).everyAF(n => typeof n === 'number')).to.be.true;
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
      await AsyncAF(nums).everyAF(num => {
        numsTimes2.push(num * 2);
        return true;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return false when any result is falsey', async () => {
      expect(await AsyncAF(nums).everyAF(n => n % 2)).to.be.false;
    });
    it('and return true when all results are truthy', async () => {
      expect(await AsyncAF(nums).everyAF(n => typeof n === 'number')).to.be.true;
    });
  });

  context('should work on an array of Promise.resolve calls', () => {
    const nums = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(4)];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).everyAF(num => {
        numsTimes2.push(num * 2);
        return true;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return false when any result is falsey', async () => {
      expect(await AsyncAF(nums).everyAF(n => n % 2)).to.be.false;
    });
    it('and return true when all results are truthy', async () => {
      expect(await AsyncAF(nums).everyAF(n => typeof n === 'number')).to.be.true;
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
      await AsyncAF(nums).everyAF(num => {
        numsTimes2.push(num * 2);
        return true;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and work with indices/array arguments', async () => {
      const result = [];
      await AsyncAF(nums).everyAF(async (num, i, arr) => {
        result.push(num + (await arr[i - 1] || 0));
        return true;
      });
      expect(result).to.eql([1, 3, 6]);
    });
    clock.restore();
  });

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).everyAF()).to.eventually.be.rejected.and.has.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should reject with TypeError when called on non-array-like objects', async () => {
    await expect(AsyncAF(null).everyAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'everyAF cannot be called on null, only on an Array or array-like Object',
    );
    await expect(AsyncAF().everyAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'everyAF cannot be called on undefined, only on an Array or array-like Object',
    );
    await expect(AsyncAF({}).everyAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'everyAF cannot be called on [object Object], only on an Array or array-like Object',
    );
    await expect(AsyncAF(true).everyAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'everyAF cannot be called on true, only on an Array or array-like Object',
    );
    await expect(AsyncAF(2).everyAF(() => { })).to.eventually.be.rejected.and.has.property(
      'message',
      'everyAF cannot be called on 2, only on an Array or array-like Object',
    );
  });
});
