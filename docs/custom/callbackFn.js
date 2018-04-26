// change 'callback' param's type to 'Function' rather than 'callback'

const handlers = {
  newDoclet(e) {
    const isCallback = e.doclet.params && e.doclet.params[0].type.names[0] === 'callback';
    if (isCallback) {
      e.doclet.params[0].type.names[0] = 'Function';
    }
  },
};

module.exports = {handlers};
