const fs = require('fs-extra');

fs.readFile('docs/out/AsyncAF.html', 'utf8')
  .then(html => html.replace(/&hellip;thisArg/g, 'thisArg'))
  .then(replaced => {
    let html = replaced;
    let temp = html;
    let index = 0;
    while (temp.includes`thisArg<span class="signature-attributes">`) {
      index = temp.indexOf`thisArg<span class="signature-attributes">`;
      temp = temp.slice(index + 42);
      html = html.slice(0, index) + html.slice(index).replace('&lt;repeatable><br>', '');
    }
    return html;
  })
  .then(html => fs.writeFile('docs/out/AsyncAF.html', html))
  // eslint-disable-next-line no-console
  .catch(e => console.error('Error generating docs: ', e));
