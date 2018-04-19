import path from 'path';

import packages from './packageList';
import {
  libName,
  moduleProp,
  minify,
  banner,
} from './webpack.parts';

export default ({modern, cover}, {mode, cache}) => ({
  mode,
  entry: packages.reduce((pkgs, [pkg, file]) => (
    {...pkgs, [pkg]: path.resolve(file)}
  ), {}),
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: `[name]${
      (modern ? '' : '.legacy')
      +
      (mode === 'production' ? '.min' : '')
    }.js`,
    library: [libName, '[name]'],
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    pathinfo: false,
  },
  module: moduleProp(cache, modern, cover),
  optimization: mode === 'production' ? minify() : {},
  plugins: [
    banner,
  ],
});
