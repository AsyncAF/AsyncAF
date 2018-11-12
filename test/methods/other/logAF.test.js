import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {logAF} from '../../../dist/async-af';
import log from '../../../dist/@async-af/log';
import AsyncAfWrapper from '../../../dist/@async-af/wrapper';

chai.use(sinonChai);

describe('logAF static method', () => {
  let wrappedLogStub;
  let logAfStub;

  beforeEach(() => {
    wrappedLogStub = sinon.stub();
    logAfStub = Object.assign(logAF, {wrappedLog: wrappedLogStub});
    logAfStub.options.reset();
  });

  it('should call console.log (wrapped) once', async () => {
    await logAfStub();
    expect(wrappedLogStub).to.have.been.calledOnce;
  });

  it('should log primitives', async () => {
    await logAfStub(1, 'a');
    expect(wrappedLogStub.args[0]).to.include(1).and.include('a');
  });

  it('should log objects and null', async () => {
    await logAfStub({}, [], Math, null);
    expect(wrappedLogStub.args[0])
      .to.deep.include({})
      .and.deep.include([])
      .and.deep.include(Math)
      .and.deep.include(null);
  });

  it('should accept promises and log their resolved values', async () => {
    const promises = [1, 2].map(n => Promise.resolve(n));

    await logAfStub(...promises);
    expect(wrappedLogStub.args[0]).to.include(1).and.include(2);
  });

  context('default options', () => {
    it('should be label: true, labelFormat: file, duration: true', async () => {
      await logAfStub(1, 2);
      expect(wrappedLogStub).to.have.been.calledWithMatch(
        '',
        /^@logAF.test.js:\d+:\d+:(\n|\r)$/,
        1,
        2,
        /^(\n|\r) in \d\.\d{3} secs$/,
      );
    });
  });

  context('options', () => {
    it('should not throw when nothing is passed in', () => {
      expect(() => logAfStub.options()).to.not.throw();
    });
    it('should allow turning off the label', async () => {
      logAfStub.options({label: false});
      await logAfStub('no label');
      expect(wrappedLogStub).to.be.calledWithMatch(
        '',
        'no label',
        /^(\n|\r) in \d\.\d{3} secs$/,
      );
    });

    it('should allow turning off duration', async () => {
      logAfStub.options({duration: false});
      await logAfStub('no duration');
      expect(wrappedLogStub).to.have.been.calledWithMatch(
        '',
        /^@logAF.test.js:\d+:\d+:(\n|\r)$/,
        'no duration',
      );
    });

    context('should change labelFormat to', () => {
      it('path', async () => {
        logAfStub.options({labelFormat: 'path'});
        await logAfStub('path');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          /^@\/.+\/AsyncAF\/test\/methods\/other\/logAF.test.js:\d+:\d+:(\n|\r)$/,
          'path',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
      it('parent', async () => {
        logAfStub.options({labelFormat: 'parent'});
        await logAfStub('parent');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          /^@other\/logAF.test.js:\d+:\d+:(\n|\r)$/,
          'parent',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
      it('arrow', async () => {
        logAfStub.options({labelFormat: 'arrow'});
        await logAfStub('arrow');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          /^={24}>$/,
          'arrow',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
      it('custom', async () => {
        logAfStub.options({labelFormat: 'here\'s the log! ~~~'});
        await logAfStub('custom');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          'here\'s the log! ~~~',
          'custom',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
    });

    context('custom labelFormat should have access to variable', () => {
      it('arrow', async () => {
        logAfStub.options({labelFormat: ({arrow}) => arrow});
        await logAfStub('arrow');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          /^={24}>$/,
          'arrow',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
      it('line', async () => {
        logAfStub.options({labelFormat: ({line}) => line});
        await logAfStub('line number');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          /^\d+$/,
          'line number',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
      it('col', async () => {
        logAfStub.options({labelFormat: ({col}) => col});
        await logAfStub('col number');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          /^\d+$/,
          'col number',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
      it('parent', async () => {
        logAfStub.options({labelFormat: ({parent}) => parent});
        await logAfStub('parent');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          'other/',
          'parent',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
      it('file', async () => {
        logAfStub.options({labelFormat: ({file}) => file});
        await logAfStub('file');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          'logAF.test.js',
          'file',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
      it('path', async () => {
        logAfStub.options({labelFormat: ({path}) => path});
        await logAfStub('path');
        expect(wrappedLogStub).to.have.been.calledWithMatch(
          '',
          /^\/.+\/AsyncAF\/test\/methods\//,
          'path',
          /^(\n|\r) in \d\.\d{3} secs$/,
        );
      });
    });

    it('should warn when passed an invalid labelFormat and use defaults', async () => {
      const wrappedWarnStub = sinon.stub();
      logAfStub = Object.assign(logAF, {wrappedWarn: wrappedWarnStub});

      logAfStub.options({labelFormat: 2300});
      await logAfStub('invalidFormat');
      expect(wrappedWarnStub).to.have.been.calledWith(
        'Warning: logAF labelFormat option must be set to \'file\' (default), \'path\', \'parent\', \'arrow\', or a custom string or function\n',
      );
      expect(wrappedLogStub).to.have.been.calledWithMatch(
        '',
        /^@logAF.test.js:\d+:\d+:(\n|\r)$/,
        'invalidFormat',
        /^(\n|\r) in \d\.\d{3} secs$/,
      );
    });
    it('should warn when passed an invalid labelFormat and fall back to the prior setting', async () => {
      const wrappedWarnStub = sinon.stub();
      logAfStub = Object.assign(logAF, {wrappedWarn: wrappedWarnStub});
      logAfStub.options({labelFormat: 'path'});
      logAfStub.options({labelFormat: 2300});
      await logAfStub('invalidFormat');
      expect(wrappedWarnStub).to.have.been.calledWith(
        'Warning: logAF labelFormat option must be set to \'file\' (default), \'path\', \'parent\', \'arrow\', or a custom string or function\n',
      );
      expect(wrappedLogStub).to.have.been.calledWithMatch(
        '',
        /^@\/.+\/AsyncAF\/test\/methods\/other\/logAF.test.js:\d+:\d+:(\n|\r)$/,
        'invalidFormat',
        /^(\n|\r) in \d\.\d{3} secs$/,
      );
    });
  });
});

describe('@async-af/log separate package', () => {
  let wrappedLogStub;
  let logStub;
  const nums = [1, 2].map(n => Promise.resolve(n));

  beforeEach(() => {
    wrappedLogStub = sinon.stub();
    logStub = Object.assign(log, {wrappedLog: wrappedLogStub});
    logStub.options.reset();
  });
  it('should work when called directly', async () => {
    await logStub(...nums);
    expect(wrappedLogStub).to.have.been.calledWithMatch(
      '',
      /^@logAF.test.js:\d+:\d+:(\n|\r)$/,
      1,
      2,
      /^(\n|\r) in \d\.\d{3} secs$/,
    );
  });
  it('should work when added to AsyncAfWrapper', async () => {
    AsyncAfWrapper.use({}, {log: logStub});
    await AsyncAfWrapper.log(...nums);
    expect(wrappedLogStub).to.have.been.calledWithMatch(
      '',
      /^@logAF.test.js:\d+:\d+:(\n|\r)$/,
      1,
      2,
      /^(\n|\r) in \d\.\d{3} secs$/,
    );
  });
});
