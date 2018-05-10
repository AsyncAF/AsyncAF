import fs from 'fs-extra';
import packages from '../packageList';
import makeWrapperReadme from './readmeFactories/makeWrapperReadme';
import makeMethodReadme from './readmeFactories/makeMethodReadme';
import {
  isWrapper,
  libNameCamel,
} from './createPackageJsons';

packages.forEach(([{name: memberName}, , pkgName]) => {
  // README for 'async-af' package is copied from root README in makefile
  if (memberName === libNameCamel) return; // so skip 'AsyncAF' memberName
  // generate READMEs for scoped packages:
  fs.outputFileSync(`dist/${pkgName}/README.md`, isWrapper(pkgName)
    ? makeWrapperReadme(pkgName)
    : makeMethodReadme(pkgName, memberName));
});
