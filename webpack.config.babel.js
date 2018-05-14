import path from 'path';
import {optimize} from 'webpack';

import packages, {makeScoped} from './packageList';
import {isMain} from './scripts/helpers';
import {
  libName,
  moduleProp,
  minify,
  banner,
} from './webpack.parts';

const {ModuleConcatenationPlugin} = optimize;

export default ({modern, cover}, {mode, cache}) => ({
  mode,
  entry: packages.reduce((pkgs, [{name}, file]) => (
    {...pkgs, [name]: path.resolve(file)}
  ), {}),
  devtool: 'source-map',
  output: {
    path: path.resolve('dist'),
    filename: ({chunk: {name}}) => `${isMain(name) ? libName : makeScoped(name)}/${
      (modern ? '' : 'legacy/') +
      (mode === 'production' ? 'min' : 'index')
    }.js`,
    library: '[name]',
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
    new ModuleConcatenationPlugin(),
  ],
});
