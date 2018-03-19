const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {BannerPlugin} = require('webpack');

const {
  name: libName,
  version,
  author,
  license,
} = require('./package.json');

const moduleProp = cache => ({
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: cache,
        plugins: ['@babel/plugin-transform-runtime'],
        presets: [['@babel/preset-env', {
          modules: false,
          targets: {
            browsers: [
              '> 0.5%',
              'last 2 versions',
              'Firefox ESR',
              'not dead',
              'not ie <= 10',
            ],
          },
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
        mangle: {toplevel: true},
        minimize: true,
      },
      parallel: true,
      sourceMap: true,
    }),
  ],
});

const banner = new BannerPlugin({
  banner: `${libName} v${version}\n[file]\n\nCopyright (c) 2017-present, ${author}\n\nThis source code is licensed under the ${license} license found in the\nLICENSE file in the root directory of this source tree.`,
  entryOnly: true,
});

module.exports = {
  moduleProp,
  minify,
  banner,
};
