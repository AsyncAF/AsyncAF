import fs from 'fs-extra';

import packages from '../packageList';
import makeWrapperReadme from './readmeFactories/makeWrapperReadme';
import makeMethodReadme from './readmeFactories/makeMethodReadme';
import {
  isWrapper,
  isMain,
} from './helpers';

packages.forEach(([{name: memberName}, , pkgName]) => {
  // README for 'async-af' package is copied from root README in makefile, so skip 'AsyncAF'
  if (isMain(memberName)) return;
  // generate READMEs for scoped packages:
  fs.outputFileSync(`dist/${pkgName}/README.md`, isWrapper(memberName)
    ? makeWrapperReadme(pkgName)
    : makeMethodReadme(pkgName, memberName));
});
