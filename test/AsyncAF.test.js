import {expect} from 'chai';

import AsyncAF from '../dist/async-af.modern';

describe('full AsyncAF class', () => {
  it('should create an instance of AsyncAF', () => {
    expect(AsyncAF()).to.be.an.instanceOf(AsyncAF);
  });
  it('should be the constructor for instances', () => {
    expect(AsyncAF().constructor).to.equal(AsyncAF);
  });
  it('should be the prototype of instances', () => {
    expect(Object.getPrototypeOf(AsyncAF())).to.equal(AsyncAF.prototype);
  });
  it('should be the __proto__ of instances', () => {
    // eslint-disable-next-line no-proto
    expect(AsyncAF().__proto__).to.equal(AsyncAF.prototype);
  });

  context('should have access to prototype methods', () => {
    const a = AsyncAF();
    it('mapAF', () => expect(a.mapAF).to.be.ok);
    it('filterAF', () => expect(a.filterAF).to.be.ok);
  });

  context('should have access to static methods', () => {
    it('logAF', () => expect(AsyncAF.logAF).to.be.ok);
  });
});
