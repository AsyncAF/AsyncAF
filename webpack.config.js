const path = require('path');

const packages = require('./packageList');
const {
  libName,
  moduleProp,
  minify,
  banner,
} = require('./webpack.parts');

module.exports = ({modern, cover}, {mode, cache}) => ({
  mode,
  entry: Object.entries(packages).reduce((entries, [pkg, file]) => (
    {...entries, [pkg]: path.resolve(file)}
  ), {}),
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: `[name]${
      (modern ? '.modern' : '.legacy')
      +
      (mode === 'production' ? '.min' : '')
    }.js`,
    library: [libName, '[name]'],
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: moduleProp(cache, modern, cover),
  optimization: mode === 'production' ? minify() : {},
  plugins: [
    banner,
  ],
});
