import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import {BannerPlugin} from 'webpack';

import {
  libNameCamel,
  resolvePkgInfo,
} from './scripts/helpers';

import {
  name as libName,
  version,
  author,
  description,
  license,
  licenseUrl,
} from './package.json';

const modernTargets = [
  'last 2 Chrome versions',
  'last 2 Safari versions',
  'last 2 iOS versions',
  'last 2 Firefox versions',
  'last 2 Edge versions',
];

const legacyTargets = [
  '> 0.5%',
  'not dead',
  'not ie <= 10',
];

const plugins = {
  modern: [],
  legacy: ['@babel/plugin-transform-runtime'],
  cover: ['babel-plugin-istanbul'],
};

const moduleProp = (cache, modern, cover) => ({
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: cache,
        plugins: (cover && plugins.cover) || (modern && plugins.modern) || plugins.legacy,
        presets: [['@babel/preset-env', {
          modules: false,
          targets: {browsers: modern ? modernTargets : legacyTargets},
          shippedProposals: true,
        }]],
      },
    },
  }, {
    test: /\.json$/,
    loader: 'json-loader',
  }],
});

const minify = () => ({
  minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          unsafe: true,
          passes: 2,
        },
        mangle: {
          // safari10: true, // revisit after cross-env testing
        },
        minimize: true,
        toplevel: true,
      },
      parallel: true,
      sourceMap: true,
    }),
  ],
});

const banner = new BannerPlugin({
  banner: ({chunk: {name}, filename}) => (
    `${filename.replace(/\/index|.js/g, '')} v${version}

${libNameCamel} (${description}) ${resolvePkgInfo(name, filename)}

Copyright (c) 2017-present, ${author}

This source code is licensed under the ${license} license found in this library's
GitHub repository (${licenseUrl}).`
  ),
  entryOnly: true,
});

export {
  libName,
  moduleProp,
  minify,
  banner,
};
