import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import delay from 'delay';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('series.mapAF method', () => {
  it('io (inOrder) should be an alias for series', () => {
    expect(AsyncAF().io).to.eql(AsyncAF().series);
    expect(AsyncAF().io.mapAF).to.equal(AsyncAF().series.mapAF);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 3, 4];
    it('and resolve to an instance of Array', async () => {
      expect(await AsyncAF(nums).series.mapAF(num => num * 2)).to.be.an.instanceOf(Array);
    });
    it('and map its elements', async () => {
      expect(await AsyncAF(nums).series.mapAF(num => num * 2)).to.eql([2, 4, 6, 8]);
    });
    it('and be chainable', async () => {
      expect(await AsyncAF(nums).series.mapAF(num => num).series.mapAF(num => num * 2))
        .to.eql([2, 4, 6, 8]);
    });
  });

  context('should work on an array of promises', () => {
    const promises = [1, 2, 3].map(n => Promise.resolve(n));
    it('and resolve to an instance of Array', async () => {
      expect(await AsyncAF(promises).io.mapAF(num => num * 2)).to.be.an.instanceOf(Array);
    });
    it('and map its resolved elements', async () => {
      expect(await AsyncAF(promises).series.mapAF(num => num * 2)).to.eql([2, 4, 6]);
    });
    it('and be chainable', async () => {
      expect(await AsyncAF(promises).series.mapAF(num => num).series.mapAF(num => num * 2))
        .to.eql([2, 4, 6]);
    });
  });

  it('should process elements in series', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).series.mapAF(async n => {
      await delay(n * 100);
      nums.push(n);
    });
    expect(nums).to.eql([3, 2, 1]);
    expect(Date.now()).to.equal(600);
    clock.restore();
  });

  it('should be chainable with series.forEachAF', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).series.mapAF(async n => {
      await delay(n * 100);
      nums.push(n);
      return n;
    }).series.forEachAF(async n => {
      await delay(n * 100);
      nums.push(n);
    });
    expect(nums).to.eql([3, 2, 1, 3, 2, 1]);
    expect(Date.now()).to.equal(1200);
    clock.restore();
  });

  it('series should apply to the next method invoked, not the entire chain', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).series.mapAF(async n => {
      await delay(n * 100); // 600ms (serial)
      nums.push(n);
      return n;
    }).forEachAF(async n => {
      await delay(n * 100); // 300ms (parallel)
      nums.push(n);
    });
    expect(nums).to.eql([3, 2, 1, 1, 2, 3]);
    expect(Date.now()).to.equal(900);
    clock.restore();
  });

  it('should work with indices/array arguments', async () => {
    const nums = [];
    await AsyncAF([1, 2, 3]).series.mapAF((num, i, arr) => {
      nums.push(num + (arr[i - 1] || 0));
    });
    expect(nums).to.eql([1, 3, 5]);
  });

  it('should work when referencing array argument at index > or < current', async () => {
    const nums = [1, 2, 3, 4, 5].map(n => Promise.resolve(n));
    expect(await AsyncAF(nums).io.mapAF((n, _, arr) => n + arr[0] + arr[arr.length - 1]))
      .to.eql([7, 8, 9, 10, 11]);
  });

  it('should work with thisArg specified', async () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));

    class Thing {
      constructor(num) {
        this.sum = num;
      }
      async goodAdd(nums) {
        await AsyncAF(nums).series.mapAF(function (num) {
          this.sum += num;
        }, this); // should work because we're specifying thisArg as this
      }
      async otherGoodAdd(nums) {
        await AsyncAF(nums).series.mapAF(num => {
          this.sum += num;
        }); // should work w/o specifying thisArg because of => funcs' lexical this binding
      }
      async badAdd(nums) {
        await AsyncAF(nums).series.mapAF(function (num) {
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
      await AsyncAF(arguments).series.mapAF(n => {
        nums.push(n);
      });
    }(1, 2, 3));
    expect(nums).to.eql([1, 2, 3]);
  });

  it('should preserve holes in sparse arrays', async () => {
    /* eslint-disable array-bracket-spacing */
    const sparseArr = [, , 1, , 2, , , ];
    expect(await AsyncAF(sparseArr).io.mapAF(n => n)).to.eql(sparseArr);
  });

  it('should ignore holes when iterating through sparse arrays', async () => {
    const nums = [];
    let count = 0;
    expect(await AsyncAF([, , 1, , 2, , , ]).io.mapAF(n => {
      nums.push(n);
      count++;
      return n * 2;
    })).to.eql([, , 2, , 4, , , ]); // doesn't map empty slots (no NaNs)
    expect(nums).to.eql([1, 2]); // doesn't push empty slots
    expect(count).to.equal(2); // doesn't increment count unless value is non-empty
  });

  it('should work with index argument in a sparse array', async () => {
    const oddIndexedValues = [];
    await AsyncAF([, 1, , 2, , 3, , , 4]).io.mapAF((n, i) => {
      i % 2 && oddIndexedValues.push(n);
    });
    expect(oddIndexedValues).to.eql([1, 2, 3]);
  }); /* eslint-enable */

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).series.mapAF()).to.eventually.be.rejectedWith(TypeError)
      .and.has.property(
        'message',
        'undefined is not a function',
      );
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).series.mapAF().catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `mapAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
});
