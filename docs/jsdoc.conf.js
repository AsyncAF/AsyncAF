const {
  description,
  homepage,
  keywords: [title],
} = require('../package.json');

module.exports = {
  plugins: [
    'plugins/markdown',
    'docs/custom/alterParams.js',
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
    cleverLinks: false,
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
    mainpagetitle: title,
    tutorials: 'docs/tutorials',
  },
  docdash: {
    sort: false,
    openGraph: {
      title: `${title} - Documentation`,
      type: 'website',
      image: 'https://cdn.rawgit.com/AsyncAF/AsyncAF/1ce388a7/docs/custom/assets/async-af-logo.png',
      site_name: title,
      url: homepage,
    },
    meta: {
      description,
    },
    icons: {
      appleTouchIcon: '/apple-touch-icon.png',
      favicon32x32: '/favicon-32x32.png',
      favicon16x16: '/favicon-16x16.png',
      manifest: '/site.webmanifest',
      msTileColor: '#2d89ef',
      themeColor: '#ffffff',
    },
  },
};
