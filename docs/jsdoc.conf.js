module.exports = {
  plugins: [
    'plugins/markdown',
    'docs/custom/callbackFn.js',
    'docs/custom/forceStatic.js',
  ],
  recurseDepth: 10,
  source: {
    include: 'lib',
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '(^|\\/|\\\\)_',
  },
  sourceType: module,
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure'],
  },
  templates: {
    cleverLinks: true,
    monospaceLinks: false,
    default: {
      outputSourceFiles: false,
    },
  },
  opts: {
    recurse: true,
    destination: 'docs/out',
    encoding: 'utf8',
    template: 'node_modules/docdash',
  },
  docdash: {
    sort: false,
  },
};
