import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

import packages from './packageList';
import {
  libNameCamel,
  resolvePkgInfo,
} from './scripts/helpers';

import {
  version,
  description,
  author,
  license,
  licenseUrl,
} from './package.json';

const minify = min => (min ? uglify({
  ecma: 6,
  output: {
    comments: /^!/,
  },
  compress: {
    passes: 2,
    unsafe: true,
    unsafe_arrows: true,
  },
  mangle: {
    // safari10: true, // revisit after cross-env testing
  },
  sourceMap: true,
  toplevel: true,
}) : () => {});

const getConfig = min => packages.map(([{name: memberName}, path, pkgName]) => ({
  input: `${path}.js`,
  output: {
    file: `dist/${pkgName}/esm/${min ? 'min' : 'index'}.js`,
    format: 'es',
    sourcemap: true,
    banner: `/*!
${pkgName}/esm${min ? '/min' : ''} v${version}

${libNameCamel} (${description}) ${resolvePkgInfo(memberName, pkgName)}

Copyright (c) 2017-present, ${author}

This source code is licensed under the ${license} license found in this library's
GitHub repository (${licenseUrl}).
 */`.replace(/\n(?!\s\*\/)/g, '\n * '),
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    minify(min),
  ],
}));

export default [...getConfig(), ...getConfig('min')];
