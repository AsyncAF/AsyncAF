import fs from 'fs-extra';

const opt = '<span class=signature-attributes>opt</span>';

// override the auto-generated method signature for each method listed below

const sigsToAlter = [
  {
    name: 'logAF_options',
    signature: `options: {label${opt}, duration${opt}, labelFormat${opt}}`,
  },
];

fs.readFile('docs/out/AsyncAF.html', 'utf8').then(html => {
  let revised = html;
  sigsToAlter.forEach(({name, signature}) => {
    revised = revised.split(`id=${name}`);
    revised[1] = revised[1].replace(/class=signature>\(.+\)</, `class=signature>(${signature})<`);
    revised = revised.join(`id=${name}`);
  });
  return revised;
}).then(html => fs.writeFile('docs/out/AsyncAF.html', html));
