import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import delay from 'delay';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('series.filterAF method', () => {
  it('io (inOrder) should be an alias for series', () => {
    expect(AsyncAF().io).to.eql(AsyncAF().series);
    expect(AsyncAF().io.filterAF).to.equal(AsyncAF().series.filterAF);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).io.filterAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and resolve to an Array', async () => {
      expect(await AsyncAF(nums).io.filterAF(n => n % 2)).to.be.an.instanceOf(Array);
    });
    it('and filter the new Array\'s elements', async () => {
      expect(await AsyncAF(nums).io.filterAF(n => n % 2)).to.eql([1]);
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).io.filterAF(num => {
        numsTimes2.push(num * 2);
      });
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and resolve to an Array', async () => {
      expect(await AsyncAF(nums).io.filterAF(n => n % 2)).to.be.an.instanceOf(Array);
    });
    it('and filter the new Array\'s elements', async () => {
      expect(await AsyncAF(nums).io.filterAF(n => n % 2)).to.eql([1]);
    });
  });

  it('should process elements in series', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).io.filterAF(async n => {
      await delay(n * 100);
      return nums.push(n);
    });
    expect(nums).to.eql([3, 2, 1]);
    expect(Date.now()).to.equal(600);
    clock.restore();
  });

  it('should work with indices/array arguments', async () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    const result = [];
    await AsyncAF(nums).io.filterAF(async (num, i, arr) => {
      result.push(num + (await arr[i - 1] || 0));
    });
    expect(result).to.eql([1, 3, 6]);
  });

  it('should work when referencing array argument at index > or < current', async () => {
    const nums = [1, 2, 3, 4, 5].map(n => Promise.resolve(n));
    expect(await AsyncAF(nums).io.filterAF((_, i, arr) => (
      arr[i] > arr[0] && arr[i] < arr[arr.length - 1]
    ))).to.eql([2, 3, 4]);
  });

  it('should work with thisArg specified', async () => {
    const nums = [1, 2, 3].map(n => Promise.resolve(n));

    class Thing {
      constructor(num) {
        this.sum = num;
      }
      async goodAdd(nums) {
        await AsyncAF(nums).io.filterAF(function (num) {
          this.sum += num;
          return true;
        }, this); // should work because we're specifying thisArg as this
      }
      async otherGoodAdd(nums) {
        await AsyncAF(nums).io.filterAF(num => {
          this.sum += num;
          return true;
        }); // should work w/o specifying thisArg because of => funcs' lexical this binding
      }
      async badAdd(nums) {
        await AsyncAF(nums).io.filterAF(function (num) {
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
      await AsyncAF(arguments).io.filterAF(n => nums.push(n));
    }(1, 2, 3));
    expect(nums).to.eql([1, 2, 3]);
  });

  it('should remove holes in sparse arrays', async () => {
    /* eslint-disable array-bracket-spacing */
    expect([, , 1, , 2, , ].filter(() => true)).to.eql([1, 2]);
    expect(await AsyncAF([, , 1, , 2, , ]).io.filterAF(() => true)).to.eql([1, 2]);
  });

  it('should ignore holes when iterating through sparse arrays', async () => {
    const nums = [];
    let count = 0;
    await AsyncAF([, , 1, , 2, , , ]).io.filterAF(n => {
      nums.push(n * 2);
      count++;
    });
    expect(nums).to.eql([2, 4]); // doesn't push empty slots
    expect(count).to.equal(2); // doesn't increment count unless value is non-empty
  });

  it('should work with index argument in a sparse array', async () => {
    expect(await AsyncAF([, , 1, , 2, , 3, , ]).io.filterAF((_, i) => i === 2)).to.eql([1]);
  });

  it('should filter undefined values in a sparse array', async () => {
    const before = [, undefined, , undefined, , ];
    const after = [undefined, undefined];
    expect(before.filter(el => el === undefined)).to.eql(after);
    expect(await AsyncAF(before).io.filterAF(el => el === undefined)).to.eql(after);
  }); /* eslint-enable */

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).io.filterAF()).to.eventually.be.rejected.and.has.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).io.filterAF(() => {}).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `filterAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
});
