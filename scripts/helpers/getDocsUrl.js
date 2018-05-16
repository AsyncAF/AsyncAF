import {isWrapper, isMain} from '../helpers';

import {homepage, keywords} from '../../package.json';

const [libNameCamel] = keywords; // AsyncAF

export default (name = libNameCamel) => `(${homepage}/${
  isWrapper(name) ? name : libNameCamel
}${
  (isMain(name) || isWrapper(name)) ? '' : `#${name}`
})`;

export {libNameCamel};
