const path = require('path');

const packages = require('./packageList');
const {name: libName} = require('./package.json');
const {
  moduleProp,
  minify,
  banner,
} = require('./webpack.parts');

module.exports = (_, {mode, cache}) => ({
  mode,
  entry: Object.entries(packages).reduce((entries, [pkg, file]) => (
    {...entries, [pkg]: path.resolve(file)}
  ), {}),
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: `[name]${mode === 'production' ? '.min' : ''}.js`,
    library: [libName, '[name]'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: moduleProp(cache),
  optimization: mode === 'production' ? minify() : {},
  plugins: [
    banner,
  ],
});
