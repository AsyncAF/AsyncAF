import fs from 'fs-extra';

// fixes visible html, changing 'logAF_options' to 'logAF.options'; retains '#logAF_options for links

fs.readdirSync('docs/out').filter(file => file.includes`.html`).forEach(file => {
  fs.readFile(`docs/out/${file}`, 'utf8')
    .then(html => html.replace(/>logAF_options</g, '>logAF.options<'))
    .then(html => fs.writeFile(`docs/out/${file}`, html))
    // eslint-disable-next-line no-console
    .catch(e => console.error('Error generating docs: ', e));
});
