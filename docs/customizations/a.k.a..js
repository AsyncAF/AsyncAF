exports.defineTags = dictionary => {
  dictionary.defineTag('aka', {
    canHaveValue: true,
    mustNotHaveDescription: true,
    onTagged: (doclet, tag) => {
      // doclet.aka = tag.value;
      Object.assign(doclet, {
        'a.k.a.': tag.value,
      });
    },
  });
};

exports.handlers = {
  newDoclet(e) {
  // beforeParse(e) {
    if (e.doclet.aka) {
      e.doclet.description = `${e.doclet.description}${e.doclet.aka}zzzzzzzzzzzzzzzzzzzzzzz`;
    }
  },
};
