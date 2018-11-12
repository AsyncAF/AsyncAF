import chai, {expect} from 'chai';
import assert from 'assert';
import chaiAsPromised from 'chai-as-promised';

import promiseAllWithHoles from '../../lib/methods/_internal/promiseAllWithHoles';

chai.use(chaiAsPromised);
chai.use(({Assertion}, {flag}) => {
  const getStatus = promise => ['pending', 'fulfilled', 'rejected'][
    // node internals, may break at some point; just test asynchronously w/ Promise.race in that case
    process.binding('util').getPromiseDetails(promise)[0]
  ];
  Assertion.addMethod('status', function fn(expected) {
    const subject = getStatus(flag(this, 'object'));
    const msg = `expected ${subject} to equal ${expected}`;
    assert.equal(subject, expected, msg);
  });
});


describe('promiseAllWithHoles function', () => {
  it('should return an already fulfilled promise if passed an empty array', () => {
    expect(promiseAllWithHoles([])).to.have.status('fulfilled');
  });
  it('should return a pending promise if array contains no promises', () => {
    expect(promiseAllWithHoles([1, 2, 3])).have.status('pending');
  });
  it('should return a pending promise if array contains promises', () => {
    expect(promiseAllWithHoles([Promise.resolve()])).to.have.status('pending');
  });
  it('should be rejected if any promises are rejected', async () => {
    const result = [];
    const err = Error();
    const promises = [1, Promise.reject(err), 3];
    await promiseAllWithHoles(promises).then(
      values => result.push(values),
      reason => result.push(reason),
    );
    expect(result).to.eql([err]);
    expect(promiseAllWithHoles(promises)).to.eventually.be.rejected;
  });
  it('should resolve to an array containing all the resolved values', async () => {
    expect(await promiseAllWithHoles([])).to.eql([]);
    expect(await promiseAllWithHoles([1, 2])).to.eql([1, 2]);
    expect(await promiseAllWithHoles([1, 2].map(n => Promise.resolve(n)))).to.eql([1, 2]);
  });
  it('should preserve holes in the resolved array', async () => {
    /* eslint-disable no-sparse-arrays, array-bracket-spacing, comma-dangle */
    expect(await promiseAllWithHoles([1, , , , , 2])).to.eql([1, , , , , 2]);
  });
  it('should preserve holes at the end of an array', async () => {
    expect(await promiseAllWithHoles([1, , , 2, , ])).to.eql([1, , , 2, , ]);
  });
  it('should preserve holes at the beginning of an array', async () => {
    expect(await promiseAllWithHoles([, , 1, , , 2])).to.eql([, , 1, , , 2]);
  });
  it('should work with array-like objects', () => {
    (async function () {
      expect(await promiseAllWithHoles(arguments)).to.eql([1, 2, 3]);
    }(1, 2, 3));
  });
});
