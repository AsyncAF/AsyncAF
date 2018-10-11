import {expect} from 'chai';
import sinon from 'sinon';
import delay from 'delay';

import AsyncAF from '../../../dist/async-af';

describe('mapAF method', () => {
  it('should have the same arity as native map', () => {
    expect(AsyncAF([]).mapAF.length).to.equal([].map.length);
    expect(AsyncAF.prototype.mapAF.length)
      .to.equal(Array.prototype.map.length);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 3, 4];
    it('and resolve to an instance of Array', async () => {
      expect(await AsyncAF(nums).mapAF(num => num * 2)).to.be.an.instanceOf(Array);
    });
    it('and map its elements', async () => {
      expect(await AsyncAF(nums).mapAF(num => num * 2)).to.eql([2, 4, 6, 8]);
    });
    it('and be chainable', async () => {
      expect(await AsyncAF(nums).mapAF(num => num).mapAF(num => num * 2))
        .to.eql([2, 4, 6, 8]);
    });
  });

  context('should work on an array of promises', () => {
    const promises = [1, 2, 3].map(n => Promise.resolve(n));
    it('should resolve to an instance of Array', async () => {
      expect(await AsyncAF(promises).mapAF(num => num * 2)).to.be.an.instanceOf(Array);
    });
    it('and map its resolved elements', async () => {
      expect(await AsyncAF(promises).mapAF(num => num * 2)).to.eql([2, 4, 6]);
    });
    it('and be chainable', async () => {
      expect(await AsyncAF(promises).mapAF(num => num).mapAF(num => num * 2))
        .to.eql([2, 4, 6]);
    });
  });

  it('should process elements in parallel', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).mapAF(async n => {
      await delay(n * 100);
      nums.push(n);
    });
    expect(nums).to.eql([1, 2, 3]);
    expect(Date.now()).to.equal(300);
    clock.restore();
  });

  it('should work with indices/array arguments', async () => {
    const nums = [];
    await AsyncAF([1, 2, 3]).mapAF((num, i, arr) => {
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
        await AsyncAF(nums).mapAF(function (num) {
          this.sum += num;
        }, this); // should work because we're specifying thisArg as this
      }
      async otherGoodAdd(nums) {
        await AsyncAF(nums).mapAF(num => {
          this.sum += num;
        }); // should work w/o specifying thisArg because of => funcs' lexical this binding
      }
      async badAdd(nums) {
        await AsyncAF(nums).mapAF(function (num) {
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
      await AsyncAF(arguments).mapAF(n => {
        nums.push(n);
      });
    }(1, 2, 3));
    expect(nums).to.eql([1, 2, 3]);
  });

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([]).mapAF()).to.eventually.be.rejectedWith(TypeError)
      .and.has.property(
        'message',
        'undefined is not a function',
      );
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).mapAF().catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `mapAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
});
