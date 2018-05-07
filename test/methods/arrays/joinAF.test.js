import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('joinAF method', () => {
  it('should have the same arity as native join', () => {
    expect(AsyncAF([]).joinAF.length).to.equal([].join.length);
    expect(AsyncAF.prototype.joinAF.length).to.equal(Array.prototype.join.length);
  });

  context('should work on an array of non-promises', () => {
    const animals = ['cow', 'rabbit', 'chicken', 'moose'];
    it('should return an empty string given an empty array', async () => {
      expect(await AsyncAF([]).joinAF()).to.equal('');
    });
    it('should use a comma as the default separator', async () => {
      expect(await AsyncAF(animals).joinAF()).to.equal('cow,rabbit,chicken,moose');
    });
    it('should convert separator to a string when necessary', async () => {
      expect(await AsyncAF(animals).joinAF(null))
        .to.equal('cownullrabbitnullchickennullmoose');
    });
    it('should not separate elements given an empty string separator', async () => {
      expect(await AsyncAF(animals).joinAF('')).to.equal('cowrabbitchickenmoose');
    });
    it('should take into account whitespace in the separator', async () => {
      expect(await AsyncAF(animals).joinAF(' ')).to.equal('cow rabbit chicken moose');
    });
  });

  context('should work on an array-like object', () => {
    const animals = {0: 'cow', 1: 'rabbit', 2: 'chicken', 3: 'moose', length: 4};
    it('should return an empty string given an empty array', async () => {
      expect(await AsyncAF([]).joinAF()).to.equal('');
    });
    it('should use a comma as the default separator', async () => {
      expect(await AsyncAF(animals).joinAF()).to.equal('cow,rabbit,chicken,moose');
    });
    it('should convert separator to a string when necessary', async () => {
      expect(await AsyncAF(animals).joinAF(null))
        .to.equal('cownullrabbitnullchickennullmoose');
    });
    it('should not separate elements given an empty string separator', async () => {
      expect(await AsyncAF(animals).joinAF('')).to.equal('cowrabbitchickenmoose');
    });
    it('should take into account whitespace in the separator', async () => {
      expect(await AsyncAF(animals).joinAF(' ')).to.equal('cow rabbit chicken moose');
    });
  });

  context('should work on an array of promises', () => {
    const animals = ['cow', 'rabbit', 'chicken', 'moose'].map(n => Promise.resolve(n));
    it('should return an empty string given an empty array', async () => {
      expect(await AsyncAF([]).joinAF()).to.equal('');
    });
    it('should use a comma as the default separator', async () => {
      expect(await AsyncAF(animals).joinAF()).to.equal('cow,rabbit,chicken,moose');
    });
    it('should convert separator to a string when necessary', async () => {
      expect(await AsyncAF(animals).joinAF(null))
        .to.equal('cownullrabbitnullchickennullmoose');
    });
    it('should not separate elements given an empty string separator', async () => {
      expect(await AsyncAF(animals).joinAF('')).to.equal('cowrabbitchickenmoose');
    });
    it('should take into account whitespace in the separator', async () => {
      expect(await AsyncAF(animals).joinAF(' ')).to.equal('cow rabbit chicken moose');
    });
  });

  context('should work on a promise that resolves to an array-like object', () => {
    const animals = Promise.resolve(
      {0: 'cow', 1: 'rabbit', 2: 'chicken', 3: 'moose', length: 4},
    );
    it('should return an empty string given an empty array', async () => {
      expect(await AsyncAF([]).joinAF()).to.equal('');
    });
    it('should use a comma as the default separator', async () => {
      expect(await AsyncAF(animals).joinAF()).to.equal('cow,rabbit,chicken,moose');
    });
    it('should convert separator to a string when necessary', async () => {
      expect(await AsyncAF(animals).joinAF(null))
        .to.equal('cownullrabbitnullchickennullmoose');
    });
    it('should not separate elements given an empty string separator', async () => {
      expect(await AsyncAF(animals).joinAF('')).to.equal('cowrabbitchickenmoose');
    });
    it('should take into account whitespace in the separator', async () => {
      expect(await AsyncAF(animals).joinAF(' ')).to.equal('cow rabbit chicken moose');
    });
  });

  it('should reject with TypeError when called on non-array-like objects', async () => {
    await expect(AsyncAF(null).joinAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'joinAF cannot be called on null, only on an Array or array-like Object',
    );
    await expect(AsyncAF().joinAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'joinAF cannot be called on undefined, only on an Array or array-like Object',
    );
    await expect(AsyncAF({}).joinAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'joinAF cannot be called on [object Object], only on an Array or array-like Object',
    );
    await expect(AsyncAF(true).joinAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'joinAF cannot be called on true, only on an Array or array-like Object',
    );
    await expect(AsyncAF(2).joinAF('')).to.eventually.be.rejected.and.has.property(
      'message',
      'joinAF cannot be called on 2, only on an Array or array-like Object',
    );
  });
});
