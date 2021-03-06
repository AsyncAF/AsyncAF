const handlers = {
  newDoclet(e) {
    // change 'callback' param's type to 'Function' rather than 'callback'
    const isCallback = e.doclet.params && e.doclet.params[0].type.names[0] === 'callback';
    if (isCallback)
      e.doclet.params[0].type.names[0] = 'Function';

    // give joinAF's 'separator' param an 'optional' attribute & denote default value
    const isJoinAF = e.doclet.meta.filename === 'joinAF.js';
    const isSeparator = e.doclet.params && e.doclet.params[0].name === 'separator';
    if (isJoinAF && isSeparator) {
      e.doclet.params[0].optional = true;
      e.doclet.params[0].defaultvalue = "','";
    }

    // give splitAF's 'separator' param an 'optional' attribute
    const isSplitAF = e.doclet.meta.filename === 'splitAF.js';
    if (isSplitAF && isSeparator)
      e.doclet.params[0].optional = true;

    // capitalize 'Function' in logAfOptions labelFormat param
    const isLabelFormat = e.doclet.params && e.doclet.params[0].name === 'options';
    if (isLabelFormat)
      e.doclet.params[3].type.names[1] = 'Function';
  },
};

module.exports = {handlers};
