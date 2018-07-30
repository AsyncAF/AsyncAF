import {expect} from 'chai';

import AsyncAF from '../../dist/async-af';

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
  it('should have a customized toStringTag: "AsyncAF"', () => {
    expect([
      AsyncAF().toString(),
      AsyncAF() + '', // eslint-disable-line prefer-template
      `${AsyncAF()}`,
      String(AsyncAF()),
    ]).to.eql(Array(4).fill('[object AsyncAF]'));
    expect(AsyncAF.prototype[Symbol.toStringTag]).to.equal('AsyncAF');
  });

  context('should have access to prototype methods', () => {
    const a = AsyncAF();
    it('mapAF', () => expect(a.mapAF).to.be.ok);
    it('filterAF', () => expect(a.filterAF).to.be.ok);
    it('forEachAF', () => expect(a.forEachAF).to.be.ok);
  });

  context('should have access to static methods', () => {
    it('logAF', () => expect(AsyncAF.logAF).to.be.ok);
  });

  context("should have access to 'AF-less' aliases", () => {
    const a = AsyncAF();
    it('map', () => expect(a.map).to.be.ok);
    it('filter', () => expect(a.filter).to.be.ok);
    it('forEach', () => expect(a.forEach).to.be.ok);
    it('log', () => expect(AsyncAF.log).to.be.ok);
  });

  context('should have methods then and catch', () => {
    const promises = [Promise.resolve(1), Promise.resolve(2)];
    it('and be thenable', async () => {
      const doubled = await AsyncAF(promises).then(data => data.map(n => n * 2));
      expect(doubled).to.eql([2, 4]);
    });
    it('and follow PromisesA+ spec (https://promisesaplus.com/#point-43)', async () => {
      const aaf1 = AsyncAF(['a']);
      const aaf2 = aaf1.then();
      expect(await aaf2).to.eql(['a']);
    });
    it('and be catchable', async () => {
      await AsyncAF(promises).then(() => {
        throw new Error('caught');
      }).catch(e => {
        expect(e.message).to.equal('caught');
      });
    });
  });

  context('should not be rejected for any data type:', () => {
    it('Array', async () => {
      expect(await AsyncAF([1, 2])).to.eql([1, 2]);
      expect(await AsyncAF([])).to.eql([]);
    });
    it('Object', async () => {
      // expect(await AsyncAF({a: 1})).to.eql({a: 1});
      expect(await AsyncAF({})).to.eql({});
    });
    it('String', async () => {
      expect(await AsyncAF('a')).to.equal('a');
      expect(await AsyncAF('')).to.equal('');
    });
    it('Number', async () => {
      expect(await AsyncAF(2)).to.equal(2);
      expect(await AsyncAF(0)).to.equal(0);
    });
    it('Boolean', async () => {
      expect(await AsyncAF(true)).to.be.true;
      expect(await AsyncAF(false)).to.be.false;
    });
    it('Function', async () => {
      /* eslint-disable require-jsdoc */
      function functionDeclaration() {}
      const functionExpression = function () {};
      const namedFunctionExpression = function namedFunctionExpression() {};
      const arrowFunction = () => {};

      expect(await AsyncAF(functionDeclaration)).to.equal(functionDeclaration);
      expect(await AsyncAF(functionExpression)).to.equal(functionExpression);
      expect(await AsyncAF(namedFunctionExpression)).to.equal(namedFunctionExpression);
      expect(await AsyncAF(arrowFunction)).to.equal(arrowFunction);
      /* eslint-enable */
    });
    it('undefined', async () => {
      expect(await AsyncAF()).to.be.undefined;
      expect(await AsyncAF(undefined)).to.be.undefined;
    });
    it('null', async () => {
      expect(await AsyncAF(null)).to.be.null;
    });
  });
});
