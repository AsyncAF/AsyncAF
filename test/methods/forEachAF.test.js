import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import AsyncAF from '../../dist/async-af.modern';

chai.use(chaiAsPromised);

describe('forEachAF method', () => {
  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 3];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).forEachAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 6]);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [
      new Promise(resolve => resolve(1)),
      new Promise(resolve => resolve(2)),
      new Promise(resolve => resolve(3)),
    ];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).forEachAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 6]);
    });
  });

  context('should work on an array of Promise.resolve calls', () => {
    const nums = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).forEachAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 6]);
    });
  });

  context('should process elements in order', () => {
    const clock = sinon.useFakeTimers();
    const nums = [
      new Promise(resolve => setTimeout(() => resolve(1), 2000)),
      new Promise(resolve => setTimeout(() => resolve(2), 1000)),
      new Promise(resolve => setTimeout(() => resolve(3), 0)),
    ];
    clock.runAll();
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).forEachAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 6]);
    });
    it('and work with indices/array arguments', async () => {
      const result = [];
      await AsyncAF(nums).forEachAF(async (num, i, arr) => {
        result.push(num + (await arr[i - 1] || 0));
      });
      expect(result).to.eql([1, 3, 5]);
    });
    clock.restore();
  });

  it('should work with thisArg specified', async () => {
    const nums = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];

    class Thing {
      constructor(num) {
        this.sum = num;
      }
    }
    /* eslint-disable func-names */
    Thing.prototype.goodAdd = async function(nums) {
      await AsyncAF(nums).forEachAF(function callback(num) {
        this.sum += num;
      }, this); // should work because we're specifying thisArg as this
    };

    Thing.prototype.otherGoodAdd = async function(nums) {
      await AsyncAF(nums).forEachAF(num => {
        this.sum += num;
      }); // should work w/o specifying thisArg because of => funcs' lexical this binding
    };

    Thing.prototype.badAdd = async function(nums) {
      await AsyncAF(nums).forEachAF(function callback(num) {
        this.sum += num;
      }); // should be rejected w/o specifying thisArg
    };

    const thing = new Thing(6);
    await thing.goodAdd(nums);
    expect(thing.sum).to.equal(12);

    const thing2 = new Thing(6);
    await thing2.otherGoodAdd(nums);
    expect(thing2.sum).to.equal(12);

    const thing3 = new Thing(6);
    expect(thing3.badAdd(nums)).to.be.rejectedWith(TypeError);
  });
});
