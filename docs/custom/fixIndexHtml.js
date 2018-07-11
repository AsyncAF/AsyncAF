import fs from 'fs-extra';

// if table changes, copy + paste it here
const badTable = '<table align=left><th>mode<th>browsers<th>script tag</table><p></p><tr><td>development<td>modern (ES6+)<td><code class=language-html>&lt;script src=&quot;https&#58;//unpkg.com/async-af/index.js&quot;&gt;&lt;/script&gt;</code></tr><p><p></p><tr><td>development<td>legacy (ES5+)<td><code class=language-html>&lt;script src=&quot;https&#58;//unpkg.com/async-af/legacy/index.js&quot;&gt;&lt;/script&gt;</code></tr><p><p></p><tr><td>production<td>modern (ES6+)<td><code class=language-html>&lt;script src=&quot;https&#58;//unpkg.com/async-af/min.js&quot;&gt;&lt;/script&gt;</code></tr><p><p></p><tr><td>production<td>legacy (ES5+)<td><code class=language-html>&lt;script src=&quot;https&#58;//unpkg.com/async-af/legacy/min.js&quot;&gt;&lt;/script&gt;</code></tr>';

const fixTable = table => `${table.replace(/<p>|<\/p>|<\/table>/g, '')}</table>`;

const logo = '<img src=https://cdn.rawgit.com/AsyncAF/AsyncAF/1ce388a7/docs/custom/assets/async-af-logo.png>';

fs.readFile('docs/out/index.html', 'utf8')
  .then(html => html
    // fix poorly generated table html
    .replace(badTable, fixTable(badTable))
    // center logo differently than README
    .replace(logo, `<p style=position:relative;left:24.165%;>${logo}</p>`))
  .then(html => fs.writeFile('docs/out/index.html', html));
