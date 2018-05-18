const handlers = {
  newDoclet(e) {
    // change 'callback' param's type to 'Function' rather than 'callback'
    const isCallback = e.doclet.params && e.doclet.params[0].type.names[0] === 'callback';
    if (isCallback)
      e.doclet.params[0].type.names[0] = 'Function';

    // give joinAF's 'separator' param an 'optional' attribute
    const isSeparator = e.doclet.params && e.doclet.params[0].name === 'separator';
    if (isSeparator) {
      e.doclet.params[0].optional = true;
      e.doclet.params[0].defaultvalue = "','";
    }

    // capitalize 'Function' in logAfOptions labelFormat param
    const isLabelFormat = e.doclet.params && e.doclet.params[0].name === 'options';
    if (isLabelFormat)
      e.doclet.params[3].type.names[1] = 'Function';
  },
};

module.exports = {handlers};
