import {isWrapper, isMain} from '../helpers';

const {homepage, keywords: [libNameCamel]} = require('../../package.json');

export default (name = libNameCamel) => `(${homepage}/${
  isWrapper(name) ? name : libNameCamel
}${
  (isMain(name) || isWrapper(name)) ? '' : `#${name}`
})`;

export {libNameCamel};
