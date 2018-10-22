import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import delay from 'delay';

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
    it('and find and resolve to the first element that satisfies the callback', async () => {
      expect(await AsyncAF(nums).findAF(n => n % 2 === 0)).to.equal(2);
    });
    it('and resolve to undefined if no elements satisfy the callback', async () => {
      expect(await AsyncAF(nums).findAF(n => n === 5)).to.equal(undefined);
    });
    it('and work with the index param', async () => {
      expect(await AsyncAF(nums).findAF((_, i) => i === 2)).to.equal(3);
    });
    it('and work with the array param', async () => {
      expect(await AsyncAF(nums).findAF((n, _, array) => n === array[2])).to.equal(3);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));
    it('and find and resolve to the first element that satisfies the callback', async () => {
      expect(await AsyncAF(nums).findAF(n => n % 2 === 0)).to.equal(2);
    });
    it('and resolve to undefined if no elements satisfy the callback', async () => {
      expect(await AsyncAF(nums).findAF(n => n === 5)).to.equal(undefined);
    });
    it('and work with the index param', async () => {
      expect(await AsyncAF(nums).findAF((_, i) => i === 2)).to.equal(3);
    });
    it('and work with the array param', async () => {
      expect(await AsyncAF(nums).findAF((n, i, array) => n === array[2])).to.equal(3);
    });
  });

  it('should process elements in parallel', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).findAF(async n => {
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
        await AsyncAF(nums).findAF(function (num) {
          this.sum += num;
        }, this); // should work because we're specifying thisArg as this
      }
      async otherGoodAdd(nums) {
        await AsyncAF(nums).findAF(num => {
          this.sum += num;
        }); // should work w/o specifying thisArg because of => funcs' lexical this binding
      }
      async badAdd(nums) {
        await AsyncAF(nums).findAF(function (num) {
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
      await AsyncAF(arguments).findAF(n => {
        nums.push(n);
      });
    }(1, 2, 3));
    expect(nums).to.eql([1, 2, 3]);
  });

  it('should treat holes in sparse arrays as undefined', async () => {
    expect([, , 0].find(el => !el)).to.be.undefined;
    expect(await AsyncAF([, , 0]).findAF(el => !el)).to.be.undefined;
  });

  it('should not ignore holes when iterating through sparse arrays', async () => {
    /* eslint-disable array-bracket-spacing */
    const nums = [];
    let count = 0;
    await AsyncAF([, , 1, , 2, , , ]).findAF(n => {
      nums.push(n * 2);
      count++;
    });
    expect(nums).to.eql([NaN, NaN, 2, NaN, 4, NaN, NaN]); // pushes empty slots
    expect(count).to.equal(7); // increments count even when value is empty
  });

  it('should work with index argument in a sparse array', async () => {
    expect(await AsyncAF([, , 1, , 2, , 3, , ]).findAF((_, i) => i === 2)).to.equal(1);
  }); /* eslint-enable */

  it('should throw TypeError when callback is not a function', () => {
    expect(AsyncAF([]).findAF()).to.eventually.be.rejected.and.have.property(
      'message',
      'undefined is not a function',
    );
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).findAF(() => true).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `findAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
});
