import fs from 'fs';

// add a newline to the end of generated html files

fs.readdirSync('docs/out').filter(file => file.includes`html`).forEach(file => {
  fs.appendFileSync(`docs/out/${file}`, '\n');
});
