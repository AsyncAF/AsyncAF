import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('concatAF method', () => {
  context('should work on an array of non-promises', () => {
    it('and concatenate an array', async () => {
      expect(await AsyncAF([1, 2]).concat([3])).to.eql([1, 2, 3]);
    });
    it('and concatenate multiple arrays', async () => {
      expect(await AsyncAF([1, 2]).concat([3], [4, 5])).to.eql([1, 2, 3, 4, 5]);
    });
    it('and concatenate nested arrays', async () => {
      expect(await AsyncAF([1, 2]).concat([3, [4, 5]])).to.eql([1, 2, 3, [4, 5]]);
    });
    it('and concatenate a value', async () => {
      expect(await AsyncAF([1, 2]).concat(3)).to.eql([1, 2, 3]);
    });
    it('and concatenate multiple values', async () => {
      expect(await AsyncAF([1, 2]).concat(3, 4, 5)).to.eql([1, 2, 3, 4, 5]);
    });
  });

  context('should work on an array of promises', () => {
    const arr = [1, 2].map(n => Promise.resolve(n));
    it('and concatenate an array', async () => {
      expect(await AsyncAF(arr).concat([3])).to.eql([1, 2, 3]);
    });
    it('and concatenate multiple arrays', async () => {
      expect(await AsyncAF(arr).concat([3], [4, 5])).to.eql([1, 2, 3, 4, 5]);
    });
    it('and concatenate nested arrays', async () => {
      expect(await AsyncAF(arr).concat([3, [4, 5]])).to.eql([1, 2, 3, [4, 5]]);
    });
    it('and concatenate a value', async () => {
      expect(await AsyncAF(arr).concat(3)).to.eql([1, 2, 3]);
    });
    it('and concatenate multiple values', async () => {
      expect(await AsyncAF(arr).concat(3, 4, 5)).to.eql([1, 2, 3, 4, 5]);
    });
  });

  context('should work on Promise-wrapped values, including:', () => {
    const arr = [1, 2].map(n => Promise.resolve(n));
    it('an array', async () => {
      const promise = Promise.resolve([3]);
      expect(await AsyncAF(arr).concat(promise)).to.eql([1, 2, 3]);
    });
    it('multiple arrays', async () => {
      const [arr1, arr2] = [[3], [4, 5]].map(a => Promise.resolve(a));
      expect(await AsyncAF(arr).concat(arr1, arr2)).to.eql([1, 2, 3, 4, 5]);
    });
    it('nested arrays', async () => {
      const arrayWithNestedArray = Promise.resolve([3, [4, 5]]);
      expect(await AsyncAF(arr).concat(arrayWithNestedArray)).to.eql([1, 2, 3, [4, 5]]);
    });
    it('values', async () => {
      const promises = [3, 4, 5].map(v => Promise.resolve(v));
      expect(await AsyncAF(arr).concat(...promises)).to.eql([1, 2, 3, 4, 5]);
    });
  });

  it('should be available to use in flattening deeply nested promises', async () => {
    /* eslint-disable max-len */
    const flattenAsync = arr => AsyncAF(arr).reduce(async (acc, val) => Array.isArray(await val) ? AsyncAF(acc).concat(flattenAsync(val)) : AsyncAF(acc).concat(val), []);

    const flattened = await flattenAsync(Promise.resolve([Promise.resolve(1), Promise.resolve([Promise.resolve([Promise.resolve(2), Promise.resolve([Promise.resolve(3), Promise.resolve(4)])])])]));

    expect(flattened).to.eql([1, 2, 3, 4]);
  });

  context('should work with AsyncAF-wrapped values, including:', () => {
    it('an array', async () => {
      const arr1 = AsyncAF([1, 2]);
      const arr2 = AsyncAF([3]);
      expect(await arr1.concat(arr2)).to.eql([1, 2, 3]);
    });
    it('multiple arrays', async () => {
      const [arr1, arr2, arr3] = [[1, 2], [3], [4, 5]].map(a => AsyncAF(a));
      expect(await arr1.concat(arr2, arr3)).to.eql([1, 2, 3, 4, 5]);
    });
    it('nested arrays', async () => {
      const [arr1, arr2] = [AsyncAF([1, 2]), AsyncAF([3, AsyncAF([4, 5])])];
      expect(await arr1.concat(arr2)).to.eql([1, 2, 3, [4, 5]]);
    });
    it('a value', async () => {
      const arr = AsyncAF([1, 2]);
      const value = AsyncAF(3);
      expect(await arr.concat(value)).to.eql([1, 2, 3]);
    });
    it('multiple values', async () => {
      const arr = AsyncAF([1, 2]);
      const [value1, value2, value3] = [3, 4, 5].map(n => AsyncAF(n));
      expect(await arr.concat(value1, value2, value3)).to.eql([1, 2, 3, 4, 5]);
    });
  });

  context('should work on a string', () => {
    it('and concatenate another string', async () => {
      expect(await AsyncAF('str').concat('ing')).to.equal('string');
    });
    it('and concatenate an AsyncAF-wrapped string', async () => {
      expect(await AsyncAF('str').concat(AsyncAF('ing'))).to.equal('string');
    });
    it('and convert non-string objects to strings', async () => {
      expect(await AsyncAF('').concat({})).to.equal('[object Object]');
      expect(await AsyncAF('').concat(['ha', 'ha'])).to.equal('ha,ha');
      expect(await AsyncAF('').concat(null)).to.equal('null');
      expect(await AsyncAF('').concat(true)).to.equal('true');
      expect(await AsyncAF('').concat(1, 2)).to.equal('12');
    });
    it('and convert AsyncAF-wrapped non-string objects to strings', async () => {
      expect(await AsyncAF('').concat(AsyncAF({}))).to.equal('[object Object]');
      expect(await AsyncAF('').concat(AsyncAF(['ha', 'ha']))).to.equal('ha,ha');
      expect(await AsyncAF('').concat(AsyncAF(null))).to.equal('null');
      expect(await AsyncAF('').concat(AsyncAF(true))).to.equal('true');
      expect(await AsyncAF('').concat(AsyncAF(1), AsyncAF(2))).to.equal('12');
    });
  });

  it('should reject with TypeError when called on non-compatible objects', async () => {
    await expect(AsyncAF(null).concatAF([])).to.eventually.be.rejected.and.has.property(
      'message',
      'concatAF cannot be called on null, only on an Array or String',
    );
    await expect(AsyncAF().concatAF([])).to.eventually.be.rejected.and.has.property(
      'message',
      'concatAF cannot be called on undefined, only on an Array or String',
    );
    await expect(AsyncAF({}).concatAF([])).to.eventually.be.rejected.and.has.property(
      'message',
      'concatAF cannot be called on [object Object], only on an Array or String',
    );
    await expect(AsyncAF(true).concatAF([])).to.eventually.be.rejected.and.has.property(
      'message',
      'concatAF cannot be called on true, only on an Array or String',
    );
    await expect(AsyncAF(2).concatAF([])).to.eventually.be.rejected.and.has.property(
      'message',
      'concatAF cannot be called on 2, only on an Array or String',
    );
  });
});
