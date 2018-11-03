import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import delay from 'delay';

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
    it('and find and resolve to the first index that satisfies the callback', async () => {
      expect(await AsyncAF(nums).findIndexAF(n => n % 2 === 0)).to.equal(1);
    });
    it('and resolve to -1 if no index satisfies the callback', async () => {
      expect(await AsyncAF(nums).findIndexAF(n => n === 5)).to.equal(-1);
    });
    it('and work with the index param', async () => {
      expect(await AsyncAF(nums).findIndexAF((_, i) => i === 2)).to.equal(2);
    });
    it('and work with the array param', async () => {
      expect(await AsyncAF(nums).findIndexAF((n, _, array) => n === array[2])).to.equal(2);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));
    it('and find and resolve to the first index that satisfies the callback', async () => {
      expect(await AsyncAF(nums).findIndexAF(n => n % 2 === 0)).to.equal(1);
    });
    it('and resolve to -1 if no index satisfies the callback', async () => {
      expect(await AsyncAF(nums).findIndexAF(n => n === 5)).to.equal(-1);
    });
    it('and work with the index param', async () => {
      expect(await AsyncAF(nums).findIndexAF((_, i) => i === 2)).to.equal(2);
    });
    it('and work with the array param', async () => {
      expect(await AsyncAF(nums).findIndexAF((n, _, array) => n === array[2])).to.equal(2);
    });
  });

  it('should process elements in parallel', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).findIndexAF(async n => {
      await delay(n * 100);
      nums.push(n);
    });
    expect(nums).to.eql([1, 2, 3]);
    expect(Date.now()).to.equal(300);
    clock.restore();
  });

  it('should work with thisArg specified', async () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));

    class Thing {
      constructor(num) {
        this.sum = num;
      }
      async goodAdd(nums) {
        await AsyncAF(nums).findIndexAF(function (num) {
          this.sum += num;
        }, this); // should work because we're specifying thisArg as this
      }
      async otherGoodAdd(nums) {
        await AsyncAF(nums).findIndexAF(num => {
          this.sum += num;
        }); // should work w/o specifying thisArg because of => funcs' lexical this binding
      }
      async badAdd(nums) {
        await AsyncAF(nums).findIndexAF(function (num) {
          this.sum += num;
        }); // should be rejected w/o specifying thisArg
      }
    }

    const thing = new Thing(6);
    await thing.goodAdd(nums);
    expect(thing.sum).to.equal(12);

    const thing2 = new Thing(6);
    await thing2.otherGoodAdd(nums);
    expect(thing2.sum).to.equal(12);

    const thing3 = new Thing(6);
    expect(thing3.badAdd(nums)).to.be.rejectedWith(TypeError);
  });

  it('should work on an array-like object', async () => {
    const nums = [];
    await (async function () {
      await AsyncAF(arguments).findIndexAF(n => {
        nums.push(n);
      });
    }(1, 2, 3));
    expect(nums).to.eql([1, 2, 3]);
  });

  it('should treat holes in sparse arrays as undefined', async () => {
    expect([, , 0].findIndex(el => el === undefined)).to.equal(0);
    expect(await AsyncAF([, , 0]).findIndexAF(el => el === undefined)).to.equal(0);
  });

  it('should not ignore holes when iterating through sparse arrays', async () => {
    /* eslint-disable array-bracket-spacing */
    const nums = [];
    let count = 0;
    await AsyncAF([, , 1, , 2, , , ]).findIndexAF(n => {
      nums.push(n * 2);
      count++;
    });
    expect(nums).to.eql([NaN, NaN, 2, NaN, 4, NaN, NaN]); // pushes empty slots
    expect(count).to.equal(7); // increments count even when value is empty
  });

  it('should work with index argument in a sparse array', async () => {
    expect(await AsyncAF([, , 1, , 2, , 3, , ]).findIndexAF((_, i) => i === 2)).to.equal(2);
  }); /* eslint-enable */

  it('should resolve to -1 given an empty array', async () => {
    expect([].findIndex(() => true)).to.equal(-1);
    expect(await AsyncAF([]).findIndexAF(() => true)).to.equal(-1);
  });

  it('should throw TypeError when callback is not a function', () => {
    expect(AsyncAF([]).findIndexAF()).to.eventually.be.rejected.and.have.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).findIndexAF(() => {}).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `findIndexAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
});
