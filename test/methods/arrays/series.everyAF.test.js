import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import delay from 'delay';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('series.everyAF method', () => {
  it('io (inOrder) should be an alias for series', () => {
    expect(AsyncAF().io).to.eql(AsyncAF().series);
    expect(AsyncAF().io.everyAF).to.equal(AsyncAF().series.everyAF);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).io.everyAF(num => {
        numsTimes2.push(num * 2);
        return true;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and resolve to false when any result is falsey', async () => {
      expect(await AsyncAF(nums).io.everyAF(n => n % 2)).to.be.false;
    });
    it('and resolve to true when all results are truthy', async () => {
      expect(await AsyncAF(nums).io.everyAF(n => typeof n === 'number')).to.be.true;
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).io.everyAF(num => {
        numsTimes2.push(num * 2);
        return true;
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and resolve to false when any result is falsey', async () => {
      expect(await AsyncAF(nums).io.everyAF(n => n % 2)).to.be.false;
    });
    it('and resolve to true when all results are truthy', async () => {
      expect(await AsyncAF(nums).io.everyAF(n => typeof n === 'number')).to.be.true;
    });
  });

  it('should work when referencing array argument at index <= current', async () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    const result = [];
    await AsyncAF(nums).io.everyAF((num, i, arr) => {
      result.push(num + (arr[i - 1] || 0));
      return true;
    });
    expect(result).to.eql([1, 3, 6]);
    expect(await AsyncAF(nums).io.everyAF((n, i, arr) => n === arr[i])).to.be.true;
  });

  it('should work when referencing array argument at index > current w/ await', async () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    const result = [];
    await AsyncAF(nums).io.everyAF(async (num, _, arr) => {
      result.push(num + (await arr[arr.length - 1] || 0));
      return true;
    });
    expect(result).to.eql([5, 6, 8]);

    const badResult = [];
    await AsyncAF(nums).io.everyAF((num, _, arr) => {
      badResult.push(num + (arr[arr.length - 1] || 0));
      return true;
    });
    expect(badResult).to.eql([...[1, 2].map(n => `${n}[object Promise]`), 8]);
  });

  it('should process elements in series', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).io.everyAF(async n => {
      await delay(n * 100);
      nums.push(n);
      return true;
    });
    expect(nums).to.eql([3, 2, 1]);
    expect(Date.now()).to.equal(600);
    clock.restore();
  });

  it('should stop iterating once a value resolves to false', async () => {
    const nums = [];
    await AsyncAF([1, 2, 3]).io.everyAF(n => {
      nums.push(n);
      return n !== 2;
    });
    expect(nums).to.eql([1, 2]);
  });

  it('should always return true given an empty array', async () => {
    expect([].every(() => false)).to.be.true;
    expect(await AsyncAF([]).io.everyAF(() => false)).to.be.true;
  });

  it('should not call callback given an empty array', async () => {
    const empty = [];
    await AsyncAF([]).io.everyAF(() => empty.push(1));
    expect(empty).to.be.empty;
  });

  it('should work with thisArg specified', async () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));

    class Thing {
      constructor(num) {
        this.sum = num;
      }
      async goodAdd(nums) {
        await AsyncAF(nums).series.everyAF(function (num) {
          this.sum += num;
          return true;
        }, this); // should work because we're specifying thisArg as this
      }
      async otherGoodAdd(nums) {
        await AsyncAF(nums).series.everyAF(num => {
          this.sum += num;
          return true;
        }); // should work w/o specifying thisArg because of => funcs' lexical this binding
      }
      async badAdd(nums) {
        await AsyncAF(nums).series.everyAF(function (num) {
          this.sum += num;
          return true;
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
      await AsyncAF(arguments).io.everyAF(n => {
        nums.push(n);
        return true;
      });
    }(1, 2, 3));
    expect(nums).to.eql([1, 2, 3]);
  });

  it('should ignore holes in sparse arrays', async () => {
    /* eslint-disable array-bracket-spacing */
    expect([, , 1, , 2, , ].every(n => Number.isInteger(n))).to.be.true;
    expect(await AsyncAF([, , 1, , 2, , ]).io.everyAF(n => Number.isInteger(n))).to.be.true;
  });

  it('should work with index argument in a sparse array', async () => {
    expect(await AsyncAF([, 1, , 2, , 3, , , ]).io.everyAF((_, i) => i % 2)).to.be.true;
  }); /* eslint-enable */

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).io.everyAF()).to.eventually.be.rejected.and.has.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).io.everyAF(() => {}).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `everyAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
});
