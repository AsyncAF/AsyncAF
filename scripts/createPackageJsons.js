import fs from 'fs-extra';
import packages from '../packageList';

const {
  name: libName,
  description,
  author,
  license,
  version,
  homepage,
  bugs,
  repository,
  keywords,
} = require('../package.json');

packages.forEach(([pkgName, , member]) => {
  fs.outputFileSync(`dist/${pkgName}/package.json`, JSON.stringify({
    name: pkgName.toLowerCase(),
    description: pkgName === libName
      ? description
      : `standalone ${keywords[0]} package: ${member.name} (${
        member.name.includes`Wrapper`
          ? homepage.replace('index', member.name)
          : homepage.replace('index.html', `AsyncAF.html#${member.name}`)
      })`,
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
