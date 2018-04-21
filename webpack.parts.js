import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import {BannerPlugin} from 'webpack';

const {
  name: libName,
  version,
  author,
  description,
  license,
} = require('./package.json');

const modernTargets = [
  'last 2 Chrome versions', 'not Chrome < 60',
  'last 2 Safari versions', 'not Safari < 10.1',
  'last 2 iOS versions', 'not iOS < 10.3',
  'last 2 Firefox versions', 'not Firefox < 54',
  'last 2 Edge versions', 'not Edge < 15',
];

const legacyTargets = [
  '> 0.5%',
  'last 2 versions',
  'Firefox ESR',
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
        }]],
      },
    },
  }],
});

const minify = () => ({
  minimizer: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          passes: 2,
        },
        mangle: {
          toplevel: true,
          // safari10: true, // revisit after cross-env testing
        },
        minimize: true,
      },
      parallel: true,
      sourceMap: true,
    }),
  ],
});

const banner = new BannerPlugin({
  banner: `${libName} ${description}\n\n[filebase] v${version}\n\nCopyright (c) 2017-present, ${author}\n\nThis source code is licensed under the ${license} license found in the\nLICENSE file in the root directory of this source tree.`,
  entryOnly: true,
});

export {
  libName,
  moduleProp,
  minify,
  banner,
};
