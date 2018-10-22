import {expect} from 'chai';
import sinon from 'sinon';
import delay from 'delay';

import AsyncAF from '../../../dist/async-af';

describe('series.forEachAF method', () => {
  it('io (inOrder) should be an alias for series', () => {
    expect(AsyncAF().io).to.eql(AsyncAF().series);
    expect(AsyncAF().io.forEachAF).to.equal(AsyncAF().series.forEachAF);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 3];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).series.forEachAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 6]);
    });
    it('and resolve to undefined', async () => {
      expect(await AsyncAF(nums).series.forEachAF(num => num)).to.equal(undefined);
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
      await AsyncAF(nums).series.forEachAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 6]);
    });
  });

  it('should process elements in series', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).series.forEachAF(async n => {
      await delay(n * 100);
      nums.push(n);
    });
    expect(nums).to.eql([3, 2, 1]);
    expect(Date.now()).to.equal(600);
    clock.restore();
  });

  it('should work with indices/array arguments', async () => {
    const nums = [];
    await AsyncAF([1, 2, 3]).series.forEachAF((num, i, arr) => {
      nums.push(num + (arr[i - 1] || 0));
    });
    expect(nums).to.eql([1, 3, 5]);
  });

  it('should work with thisArg specified', async () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));

    class Thing {
      constructor(num) {
        this.sum = num;
      }
      async goodAdd(nums) {
        await AsyncAF(nums).series.forEachAF(function (num) {
          this.sum += num;
        }, this); // should work because we're specifying thisArg as this
      }
      async otherGoodAdd(nums) {
        await AsyncAF(nums).series.forEachAF(num => {
          this.sum += num;
        }); // should work w/o specifying thisArg because of => funcs' lexical this binding
      }
      async badAdd(nums) {
        await AsyncAF(nums).series.forEachAF(function (num) {
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
      await AsyncAF(arguments).series.forEachAF(n => {
        nums.push(n);
      });
    }(1, 2, 3));
    expect(nums).to.eql([1, 2, 3]);
  });

  it('should ignore holes when iterating through sparse arrays', async () => {
    /* eslint-disable array-bracket-spacing */
    const nums = [];
    let count = 0;

    await AsyncAF([, , 1, , 2, , , ]).io.forEachAF(n => {
      nums.push(n * 2);
      count++;
    });
    expect(nums).to.eql([2, 4]); // doesn't push empty slots
    expect(count).to.equal(2); // doesn't increment count unless value is non-empty
  });

  it('should work with index argument in a sparse array', async () => {
    const oddIndexedValues = [];
    await AsyncAF([, 1, , 2, , 3, , , 4]).io.forEachAF((n, i) => {
      i % 2 && oddIndexedValues.push(n);
    });
    expect(oddIndexedValues).to.eql([1, 2, 3]);
  }); /* eslint-enable */

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).series.forEachAF()).to.eventually.be.rejectedWith(TypeError)
      .and.has.property(
        'message',
        'undefined is not a function',
      );
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).series.forEachAF().catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `forEachAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
});
