import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import delay from 'delay';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('series.reduceAF method', () => {
  it('io (inOrder) should be an alias for series', () => {
    expect(AsyncAF().io).to.eql(AsyncAF().series);
    expect(AsyncAF().io.reduceAF).to.equal(AsyncAF().series.reduceAF);
  });

  context('should work on an array of non-promises', () => {
    const nums = [1, 2, 4];
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).io.reduceAF((_, num) => {
        numsTimes2.push(num * 2);
      }, 0);
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and resolve to the correct type', async () => {
      expect(await AsyncAF(nums).io.reduceAF((sum, num) => sum + num))
        .to.be.a('number').and.equal(7);
    });
    it('and work with an initialValue', async () => {
      expect(await AsyncAF(nums).io.reduceAF((obj, num, i) => ({
        ...obj, [i]: num,
      }), {})).to.eql({0: 1, 1: 2, 2: 4});
    });
  });

  context('should work on an array of promises', () => {
    const nums = [1, 2, 4].map(n => Promise.resolve(n));
    it('and apply a function to each', async () => {
      const numsTimes2 = [];
      await AsyncAF(nums).io.reduceAF((_, num) => {
        numsTimes2.push(num * 2);
      }, 0);
      expect(numsTimes2).to.eql([2, 4, 8]);
    });
    it('and resolve to the correct type', async () => {
      expect(await AsyncAF(nums).io.reduceAF((sum, num) => sum + num))
        .to.be.a('number').and.equal(7);
    });
    it('and work with an initialValue', async () => {
      expect(await AsyncAF(nums).io.reduceAF((obj, num, i) => ({
        ...obj, [i]: num,
      }), {})).to.eql({0: 1, 1: 2, 2: 4});
    });
  });

  it('should process elements in series', async () => {
    const clock = sinon.useFakeTimers({shouldAdvanceTime: true});
    const nums = [];
    await AsyncAF([3, 2, 1]).io.reduceAF(async (_, n) => {
      await delay(n * 100);
      nums.push(n);
    }, 0);
    expect(nums).to.eql([3, 2, 1]);
    expect(Date.now()).to.equal(600);
    clock.restore();
  });

  it('and work with indices/array arguments', async () => {
    const result = [];
    await AsyncAF([1, 2, 4]).io.reduceAF((_, num, i, arr) => {
      result.push(num + (arr[i - 1] || 0));
    }, 0);
    expect(result).to.eql([1, 3, 6]);
  });

  it('should work when referencing array argument at index > or < current', async () => {
    const nums = [1, 2, 3, 4, 5].map(n => Promise.resolve(n));
    expect(await AsyncAF(nums).io.reduceAF((acc, el, i, arr) => ({
      ...acc, [i]: el + arr[0] + arr[arr.length - 1],
    }), {})).to.eql({0: 7, 1: 8, 2: 9, 3: 10, 4: 11});
  });

  it('should ignore holes in sparse arrays', async () => {
    expect([, undefined, '1'].reduce((a, b) => a + b))
      .to.equal('undefined1');
    expect(await AsyncAF([, undefined, '1']).io.reduceAF((a, b) => a + b))
      .to.equal('undefined1');
  });

  it('should return initialValue given an empty array or array full of holes', async () => {
    expect(await AsyncAF([]).io.reduceAF(() => {}, 1)).to.equal(1);
    expect(await AsyncAF(Array(5)).io.reduceAF(() => {}, 1)).to.equal(1);
  });

  it('should accept nullish arguments for initialValue', async () => {
    expect(await AsyncAF([]).io.reduceAF(acc => acc, undefined)).to.be.undefined;
    expect(await AsyncAF([]).io.reduceAF(acc => acc, null)).to.be.null;
  });

  it('should reject with TypeError: undefined is not a function', async () => {
    await expect(AsyncAF([1, 2]).io.reduceAF()).to.eventually.be.rejected.and.has.property(
      'message',
      'undefined is not a function',
    );
  });
  it('should reject with TypeError when called on non-array-like objects', async () => {
    for (const value of [null, undefined, {}, true, 2])
      await AsyncAF(value).io.reduceAF(() => {}).catch(e => {
        expect(e).to.be.an.instanceOf(TypeError).and.have.property(
          'message',
          `reduceAF cannot be called on ${value}, only on an Array or array-like Object`,
        );
      });
  });
  it('should reject when given an empty array and no initial value', async () => {
    await expect(AsyncAF([]).io.reduceAF((_, el) => el)).to.eventually.be.rejected.and.has.property(
      'message',
      'reduceAF cannot be called on an empty array without an initial value',
    );
  });
});
