import chai, {expect} from 'chai';
import chaiAsPromised from 'chai-as-promised';

import AsyncAF from '../../../dist/async-af';

chai.use(chaiAsPromised);

describe('splitAF method', () => {
  const tests = [
    ['and split based on a char',
      's,p,l,i,t', [','],
      ['s', 'p', 'l', 'i', 't']],
    ['and split on multiple chars',
      's, p, l, a, t', [', '],
      ['s', 'p', 'l', 'a', 't']],
    ['and return one element (the whole string) if no separator specified',
      'splatted', [],
      ['splatted']],
    ['and return one element (the whole string) if separator not found',
      'splitAF', ['n/a'],
      ['splitAF']],
    ['and return an array of characters when passed an empty string',
      'splatAF', [''],
      ['s', 'p', 'l', 'a', 't', 'A', 'F']],
    ['and split based on regex',
      'splittedAF', [/ted/],
      ['split', 'AF']],
    ['and include regex captured parentheses split points',
      'splittedAF', [/(lit|dA)/],
      ['sp', 'lit', 'te', 'dA', 'F']],
    ['and include an empty string when separator occurs at the beg or end',
      'beg end', [/(beg|end)/],
      ['', 'beg', ' ', 'end', '']],
    ['and include 2 \'\' if whole string is one instance of separator',
      'separator', ['separator'],
      ['', '']],
    ['and limit the # of results',
      'splittedAF', ['', 5],
      ['s', 'p', 'l', 'i', 't']],
    ['and limit should not affect result if end of string is reached first',
      'splatted ', [' ', 20],
      ['splatted', '']],
    ['and a limit of zero should return an empty array',
      'stringystring', ['', 0],
      []],
    ['and a limit of less than zero should not affect the result',
      's p l i t', [' ', -7],
      ['s', 'p', 'l', 'i', 't']],
  ];

  context('should work on a string', () => {
    tests.forEach(([msg, str, args, expected]) => {
      it(msg, async () => expect(await AsyncAF(str).splitAF(...args)).to.eql(expected));
    });
  });

  context('should work on a promise that resolves to a string', () => {
    tests.forEach(([msg, str, args, expected]) => {
      it(msg, async () => expect(await AsyncAF(Promise.resolve(str)).splitAF(...args))
        .to.eql(expected));
    });
  });

  it('should reject with TypeError when called on invalid objects/null', () => {
    [
      [null, 'null'],
      [undefined, 'undefined'],
      [{}, '[object Object]'],
      [true, 'true'],
      [2, '2'],
      [() => {}, 'function () {}'],
      [NaN, 'NaN'],
    ].forEach(async ([obj, objToString]) => {
      await expect(AsyncAF(obj).splitAF()).to.eventually.be.rejected.and.has.property(
        'message',
        `splitAF may be called on a string but was called on ${objToString}`,
      );
    });
  });
});
