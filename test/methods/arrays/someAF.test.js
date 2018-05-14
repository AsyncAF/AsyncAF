import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('someAF method', () => {
  it('should have the same arity as native some', () => {
    expect(AsyncAF([]).someAF.length).to.equal([].some.length);
    expect(AsyncAF.prototype.someAF.length)
      .to.equal(Array.prototype.some.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).someAF(num => {
        numsTimes2.push(num * 2);
        return false;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return true when any result is truthy', async () => {
      expect(await AsyncAF(nums).someAF(n => n % 2)).to.be.true;
    });
    it('and return false when all results are falsey', async () => {
      expect(await AsyncAF(nums).someAF(n => typeof n === 'string')).to.be.false;
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
      await AsyncAF(nums).someAF(num => {
        numsTimes2.push(num * 2);
        return false;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return true when any result is truthy', async () => {
      expect(await AsyncAF(nums).someAF(n => n % 2)).to.be.true;
    });
    it('and return false when all results are falsey', async () => {
      expect(await AsyncAF(nums).someAF(n => typeof n === 'string')).to.be.false;
    });
  });

  context('should work on an array of Promise.resolve calls', () => {
    const nums = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(4)];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).someAF(num => {
        numsTimes2.push(num * 2);
        return false;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and return true when any result is truthy', async () => {
      expect(await AsyncAF(nums).someAF(n => n % 2)).to.be.true;
    });
    it('and return false when all results are falsey', async () => {
      expect(await AsyncAF(nums).someAF(n => typeof n === 'string')).to.be.false;
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
      await AsyncAF(nums).someAF(num => {
        numsTimes2.push(num * 2);
        return false;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and work with indices/array arguments', async () => {
      const result = [];
      await AsyncAF(nums).someAF((num, i, arr) => {
        result.push(num + (arr[i - 1] || 0));
        return false;
      });
      expect(result).to.eql([1, 3, 6]);
    });
    clock.restore();
  });

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).someAF()).to.eventually.be.rejected.and.has.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should reject with TypeError when called on non-array-like objects', async () => {
    await expect(AsyncAF(null).someAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'someAF cannot be called on null, only on an Array or array-like Object',
    );
    await expect(AsyncAF().someAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'someAF cannot be called on undefined, only on an Array or array-like Object',
    );
    await expect(AsyncAF({}).someAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'someAF cannot be called on [object Object], only on an Array or array-like Object',
    );
    await expect(AsyncAF(true).someAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'someAF cannot be called on true, only on an Array or array-like Object',
    );
    await expect(AsyncAF(2).someAF(() => {})).to.eventually.be.rejected.and.has.property(
      'message',
      'someAF cannot be called on 2, only on an Array or array-like Object',
    );
  });
});
