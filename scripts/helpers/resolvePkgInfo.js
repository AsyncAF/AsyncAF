import {
  isMain,
  isWrapper,
  getDocsUrl,
} from '../helpers';

export default name => (
  `${isMain(name) ? '' : name + (isWrapper(name) ? ' class ' : ' method ')}
${getDocsUrl(name)}`
);
