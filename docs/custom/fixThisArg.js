import fs from 'fs-extra';

// replaces '...thisArg' with 'thisArg' and removes '<repeatable>' attribute as it's not really repeatable despite using rest params to preserve a method's correct arity

const file = 'docs/out/AsyncAF.html';

const removeRestParams = html => html.replace(/&hellip;thisArg/g, 'thisArg');
const removeRepeatable = (html, thisArg = 'thisArg<span class=signature-attr') => (
  html.split(thisArg).map(part => part.replace('&lt;repeatable><br>', '')).join(thisArg)
);
const writeFile = html => fs.writeFile(file, html);

fs.readFile(file, 'utf8')
  .then(removeRestParams)
  .then(removeRepeatable)
  .then(writeFile)
  // eslint-disable-next-line no-console
  .catch(e => console.error('Error generating docs: ', e));
