import {expect} from 'chai';

import AsyncAfModern from '../dist/async-af';
import AsyncAfModernMin from '../dist/async-af/min';
import AsyncAfLegacy from '../dist/async-af/legacy';
import AsyncAfLegacyMin from '../dist/async-af/legacy/min';

/* eslint-disable import/first */

describe('AsyncAF class should be available in', () => {
  it('AsyncAfModern', () => expect(AsyncAfModern()).to.be.an.instanceOf(AsyncAfModern));
  it('AsyncAfModernMin', () => expect(AsyncAfModernMin()).to.be.an.instanceOf(AsyncAfModernMin));
  it('AsyncAfLegacy', () => expect(AsyncAfLegacy()).to.be.an.instanceOf(AsyncAfLegacy));
  it('AsyncAfLegacyMin', () => expect(AsyncAfLegacyMin()).to.be.an.instanceOf(AsyncAfLegacyMin));
});

// test one 'AF' prototype method as they should all be building the same way

describe('AsyncAF class should include prototype method mapAF in', () => {
  it('AsyncAfModern', () => expect(AsyncAfModern().mapAF).to.be.a('function'));
  it('AsyncAfModernMin', () => expect(AsyncAfModernMin().mapAF).to.be.a('function'));
  it('AsyncAfLegacy', () => expect(AsyncAfLegacy().mapAF).to.be.a('function'));
  it('AsyncAfLegacyMin', () => expect(AsyncAfLegacyMin().mapAF).to.be.a('function'));
});

// test one 'AF-less' prototype method as they should all be building the same way

describe('AsyncAF class should include prototype method map in', () => {
  it('AsyncAfModern', () => expect(AsyncAfModern().map).to.be.a('function'));
  it('AsyncAfModernMin', () => expect(AsyncAfModernMin().map).to.be.a('function'));
  it('AsyncAfLegacy', () => expect(AsyncAfLegacy().map).to.be.a('function'));
  it('AsyncAfLegacyMin', () => expect(AsyncAfLegacyMin().map).to.be.a('function'));
});

// test one 'AF' static method as they should all be building the same way

describe('AsyncAF class should include static method logAF in', () => {
  it('AsyncAfModern', () => expect(AsyncAfModern.logAF).to.be.a('function'));
  it('AsyncAfModernMin', () => expect(AsyncAfModernMin.logAF).to.be.a('function'));
  it('AsyncAfLegacy', () => expect(AsyncAfLegacy.logAF).to.be.a('function'));
  it('AsyncAfLegacyMin', () => expect(AsyncAfLegacyMin.logAF).to.be.a('function'));
});

// test one 'AF-less' static method as they should all be building the same way

describe('AsyncAF class should include static method log in', () => {
  it('AsyncAfModern', () => expect(AsyncAfModern.log).to.be.a('function'));
  it('AsyncAfModernMin', () => expect(AsyncAfModernMin.log).to.be.a('function'));
  it('AsyncAfLegacy', () => expect(AsyncAfLegacy.log).to.be.a('function'));
  it('AsyncAfLegacyMin', () => expect(AsyncAfLegacyMin.log).to.be.a('function'));
});

import AsyncAfWrapperModern from '../dist/@async-af/wrapper';
import AsyncAfWrapperModernMin from '../dist/@async-af/wrapper/min';
import AsyncAfWrapperLegacy from '../dist/@async-af/wrapper/legacy';
import AsyncAfWrapperLegacyMin from '../dist/@async-af/wrapper/legacy/min';

describe('AsyncAfWrapper class should be available in', () => {
  it('AsyncAfWrapperModern', () => expect(AsyncAfWrapperModern()).to.be.an.instanceOf(AsyncAfWrapperModern));
  it('AsyncAfWrapperModernMin', () => expect(AsyncAfWrapperModernMin()).to.be.an.instanceOf(AsyncAfWrapperModernMin));
  it('AsyncAfWrapperLegacy', () => expect(AsyncAfWrapperLegacy()).to.be.an.instanceOf(AsyncAfWrapperLegacy));
  it('AsyncAfWrapperLegacyMin', () => expect(AsyncAfWrapperLegacyMin()).to.be.an.instanceOf(AsyncAfWrapperLegacyMin));
});

// test one prototype method as they should all be building the same way

import mapAfModern from '../dist/@async-af/map';
import mapAfModernMin from '../dist/@async-af/map/min';
import mapAfLegacy from '../dist/@async-af/map/legacy';
import mapAfLegacyMin from '../dist/@async-af/map/legacy/min';

describe('mapAF should be available in', () => {
  it('mapAfModern', () => expect(mapAfModern).to.be.a('function'));
  it('mapAfModernMin', () => expect(mapAfModernMin).to.be.a('function'));
  it('mapAfLegacy', () => expect(mapAfLegacy).to.be.a('function'));
  it('mapAfLegacyMin', () => expect(mapAfLegacyMin).to.be.a('function'));
});

// test one static method as they should all be building the same way

import logAfModern from '../dist/@async-af/log';
import logAfModernMin from '../dist/@async-af/log/min';
import logAfLegacy from '../dist/@async-af/log/legacy';
import logAfLegacyMin from '../dist/@async-af/log/legacy/min';

describe('logAF should be available in', () => {
  it('logAfModern', () => expect(logAfModern).to.be.a('function'));
  it('logAfModernMin', () => expect(logAfModernMin).to.be.a('function'));
  it('logAfLegacy', () => expect(logAfLegacy).to.be.a('function'));
  it('logAfLegacyMin', () => expect(logAfLegacyMin).to.be.a('function'));
});
