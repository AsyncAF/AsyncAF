const fs = require('fs-extra');

// simply to change '#.' to '#' for static methods, e.g., '#.logAF' -> '#logAF' for the sake of more easily linking to documentation programmatically
fs.readdirSync('docs/out').filter(file => file.includes`.html`).forEach(file => {
  fs.readFile(`docs/out/${file}`, 'utf8')
    .then(html => html.replace(/#\./g, '#'))
    .then(html => html.replace(/"\./g, '"'))
    .then(html => fs.writeFile(`docs/out/${file}`, html))
    // eslint-disable-next-line no-console
    .catch(e => console.error('Error generating docs: ', e));
});
