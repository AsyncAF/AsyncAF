// force scope to static when '@static' doesn't override '@alias' notation; add doclet.name to the array for any future occurrences

const methodsToForceStatic = [
  'logAF_options',
  'use',
];

const handlers = {
  newDoclet(e) {
    const shouldForceStatic = methodsToForceStatic.includes(e.doclet.name);
    if (shouldForceStatic) e.doclet.scope = 'static';
  },
};

module.exports = {handlers};
