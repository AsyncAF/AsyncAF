import {expect} from 'chai';

import AsyncAF from '../../../dist/async-af';

describe('finally method', () => {
  it('should not receive any argument', async () => {
    let undefinedVar;
    await AsyncAF(6).then(n => n * 2).finally(n => { undefinedVar = n; });
    expect(undefinedVar).to.be.undefined;
  });
  it('should call onFinally after resolving', async () => {
    const arr = [];
    await AsyncAF(1).then(n => arr.push(n)).finally(() => arr.push(2));
    expect(arr).to.eql([1, 2]);
  });
  it('should call onFinally after rejecting', async () => {
    const arr = [];
    await AsyncAF(6).then(() => { throw Error(); }).catch(e => e).finally(() => arr.push(1));
    expect(arr).to.eql([1]);
  });
});
