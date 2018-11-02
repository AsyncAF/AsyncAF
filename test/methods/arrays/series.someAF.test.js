import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import delay from 'delay';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('series.someAF method', () => {
  it('io (inOrder) should be an alias for series', () => {
    expect(AsyncAF().io).to.eql(AsyncAF().series);
    expect(AsyncAF().io.someAF).to.equal(AsyncAF().series.someAF);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).io.someAF(num => {
        numsTimes2.push(num * 2);
        return false;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and resolve to true when any result is truthy', async () => {
      expect(await AsyncAF(nums).io.someAF(n => n % 2)).to.be.true;
    });
    it('and resolve to false when all results are falsey', async () => {
      expect(await AsyncAF(nums).io.someAF(n => typeof n === 'string')).to.be.false;
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).io.someAF(num => {
        numsTimes2.push(num * 2);
        return false;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and resolve to true when any result is truthy', async () => {
      expect(await AsyncAF(nums).io.someAF(n => n % 2)).to.be.true;
    });
    it('and resolve to false when all results are falsey', async () => {
      expect(await AsyncAF(nums).io.someAF(n => typeof n === 'string')).to.be.false;
    });
  });

  it('should work with indices/array arguments', async () => {
    const result = [];
    await AsyncAF([1, 2, 4]).io.someAF(async (num, i, arr) => {
      result.push(num + (await arr[i - 1] || 0));
      return false;
    });
    expect(result).to.eql([1, 3, 6]);
  });

  it('should work when referencing array argument at index <= current', async () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    const result = [];
    await AsyncAF(nums).io.someAF((num, i, arr) => {
      result.push(num + (arr[i - 1] || 0));
      return false;
    });
    expect(result).to.eql([1, 3, 6]);
    expect(await AsyncAF(nums).io.someAF((n, i, arr) => n !== arr[i])).to.be.false;
  });

  it('should work when referencing array argument at index > current w/ await', async () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    const result = [];
    await AsyncAF(nums).io.someAF(async (num, _, arr) => {
      result.push(num + (await arr[arr.length - 1] || 0));
      return false;
    });
    expect(result).to.eql([5, 6, 8]);

    const badResult = [];
    await AsyncAF(nums).io.someAF((num, _, arr) => {
      badResult.push(num + (arr[arr.length - 1] || 0));
      return false;
    });
    expect(badResult).to.eql([...[1, 2].map(n => `${n}[object Promise]`), 8]);
  });

  it('should process elements in series', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).io.someAF(async n => {
      await delay(n * 100);
      nums.push(n);
      return false;
    });
    expect(nums).to.eql([3, 2, 1]);
    expect(Date.now()).to.equal(600);
    clock.restore();
  });

  it('should stop iterating once a value resolves to true', async () => {
    const nums = [];
    await AsyncAF([1, 2, 3]).io.someAF(n => {
      nums.push(n);
      return n === 2;
    });
    expect(nums).to.eql([1, 2]);
  });

  it('should always return false given an empty array', async () => {
    expect([].some(() => true)).to.be.false;
    expect(await AsyncAF([]).io.someAF(() => true)).to.be.false;
  });

  it('should not call callback given an empty array', async () => {
    const empty = [];
    await AsyncAF([]).io.someAF(() => empty.push(1));
    expect(empty).to.be.empty;
  });

  it('should work with thisArg specified', async () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));

    class Thing {
      constructor(num) {
        this.sum = num;
      }
      async goodAdd(nums) {
        await AsyncAF(nums).io.someAF(function (num) {
          this.sum += num;
        }, this); // should work because we're specifying thisArg as this
      }
      async otherGoodAdd(nums) {
        await AsyncAF(nums).io.someAF(num => {
          this.sum += num;
        }); // should work w/o specifying thisArg because of => funcs' lexical this binding
      }
      async badAdd(nums) {
        await AsyncAF(nums).io.someAF(function (num) {
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
      await AsyncAF(arguments).io.someAF(n => {
        nums.push(n);
        return false;
      });
    }(1, 2, 3));
    expect(nums).to.eql([1, 2, 3]);
  });

  it('should ignore holes in sparse arrays', async () => {
    expect([, , 1].some(n => !Number.isInteger(n))).to.be.false;
    expect(await AsyncAF([, , 1]).io.someAF(n => !Number.isInteger(n))).to.be.false;
  });

  it('should work with index argument in a sparse array', async () => {
    /* eslint-disable array-bracket-spacing */
    expect(await AsyncAF([, 1, , 2, , 3, , , ]).io.someAF((_, i) => !(i % 2))).to.be.false;
  }); /* eslint-enable */

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).io.someAF()).to.eventually.be.rejected.and.has.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).io.someAF(() => {}).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `someAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
});
