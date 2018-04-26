import {expect} from 'chai';

import AsyncAF from '../../dist/async-af';
import AsyncAfWrapper from '../../dist/@async-af/wrapper';
import forEachAF from '../../dist/@async-af/forEach';
import mapAF from '../../dist/@async-af/map';
import logAF from '../../dist/@async-af/log';

describe('use method', () => {
  it('should be available on AsyncAF', () => {
    expect(AsyncAF.use).to.be.an.instanceOf(Function);
  });
  it('should be available on AsyncAfWrapper', () => {
    expect(AsyncAfWrapper.use).to.be.an.instanceOf(Function);
  });
  it('should throw when not passed an object', () => {
    expect(() => AsyncAfWrapper.use('forEach')).to.throw(TypeError);
  });
  context('should make these methods available:', () => {
    it('forEachAF', () => {
      AsyncAfWrapper.use({forEachAF});
      expect(AsyncAfWrapper().forEachAF).to.be.an.instanceOf(Function);
      expect(AsyncAfWrapper().mapAF).to.be.undefined;
      expect(AsyncAfWrapper.logAF).to.be.undefined;
    });
    it('mapAF', () => {
      AsyncAfWrapper.use({mapAF});
      expect(AsyncAfWrapper().forEachAF).to.be.an.instanceOf(Function);
      expect(AsyncAfWrapper().mapAF).to.be.an.instanceOf(Function);
      expect(AsyncAfWrapper.logAF).to.be.undefined;
    });
    it('logAF (static does not use `use`)', () => {
      AsyncAfWrapper.logAF = logAF;
      expect(AsyncAfWrapper().forEachAF).to.be.an.instanceOf(Function);
      expect(AsyncAfWrapper().mapAF).to.be.an.instanceOf(Function);
      expect(AsyncAfWrapper.logAF).to.be.an.instanceOf(Function);
    });
    it('custom function', () => {
      const noop = () => {};
      AsyncAF.use({noop});
      expect(AsyncAF().noop).to.be.an.instanceOf(Function);
    });
  });
});
