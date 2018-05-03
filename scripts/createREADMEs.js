import fs from 'fs-extra';
import packages from '../packageList';

packages.forEach(([pkgName, , member]) => {
  if (pkgName === 'async-af') return;
  fs.outputFileSync(`dist/${pkgName}/README.md`,
    `# ${pkgName.toLowerCase()}\n\nThis is the standalone AsyncAF package for ${member.name}. Check out the docs for [usage](https://asyncaf.github.io/AsyncAF/${member.name.includes`Wrapper`
      ? 'AsyncAfWrapper.html'
      : `AsyncAF.html#${member.name}`}) or take a look at the main AsyncAF [README](https://github.com/AsyncAF/AsyncAF/blob/master/README.md).`);
  fs.appendFileSync(`dist/${pkgName}/README.md`, '\n');
});
