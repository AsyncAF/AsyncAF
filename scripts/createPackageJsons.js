import fs from 'fs-extra';
import packages from '../packageList';

const {
  description,
  author,
  license,
  version,
  homepage,
  bugs,
  repository,
  keywords,
} = require('../package.json');

const [libNameCamel] = keywords; // AsyncAF

const isWrapper = pkgName => pkgName.includes`wrapper`;

packages.forEach(([{name: memberName}, , pkgName]) => {
  const scopedDescription = `standalone ${libNameCamel} package: ${memberName} (${homepage}/${isWrapper(pkgName) ? `${memberName}.html` : `${libNameCamel}.html#${memberName}`})`;

  fs.outputFileSync(`dist/${pkgName}/package.json`, JSON.stringify({
    name: pkgName,
    description: memberName === libNameCamel ? description : scopedDescription,
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

export {
  libNameCamel,
  isWrapper,
  homepage,
};
