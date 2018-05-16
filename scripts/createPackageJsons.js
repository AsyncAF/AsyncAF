import fs from 'fs-extra';

import packages from '../packageList';
import {
  isMain,
  libNameCamel,
  getDocsUrl,
} from './helpers';

import {
  description,
  author,
  license,
  version,
  homepage,
  bugs,
  repository,
  keywords,
} from '../package.json';

packages.forEach(([{name: memberName}, , pkgName]) => {
  const docs = getDocsUrl(memberName);
  const scopedDescription = `standalone ${libNameCamel} package: ${memberName} ${docs}`;

  fs.outputFileSync(`dist/${pkgName}/package.json`, JSON.stringify({
    name: pkgName,
    description: isMain(memberName) ? description : scopedDescription,
    author,
    license,
    version,
    homepage,
    bugs,
    repository,
    keywords,
    main: 'index.js',
    files: [
      'index*',
      'min*',
      'legacy/**',
      'README.md',
    ],
    publishConfig: {
      access: 'public',
    },
    sideEffects: false,
  }, null, 2));
  fs.appendFileSync(`dist/${pkgName}/package.json`, '\n');
});
