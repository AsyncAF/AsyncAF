import fs from 'fs-extra';

// remove .html from hrefs before publish

const removeHtml = file => {
  const html = fs.readFileSync(file, 'utf8')
    .replace(/index\.html/g, '/')
    .replace(/AsyncAF\.html/g, '/AsyncAF')
    .replace(/AsyncAfWrapper\.html/g, '/AsyncAfWrapper')
    .replace(/(tutorial.+)\.html/g, '/$1');
  fs.writeFileSync(file, html);
};

fs.readdirSync('docs/out')
  .filter(file => /\.html$/.test(file))
  .forEach(file => removeHtml(`docs/out/${file}`));
