import {homepage} from '../createPackageJsons';

const makeWrapperReadme = pkgName =>
  `# ${pkgName}

This is the standalone [\`AsyncAF\`](${homepage}) package for [\`AsyncAfWrapper\`](${homepage}/AsyncAfWrapper.html).

\`AsyncAfWrapper\` is one option for cherry-picking only the [\`AsyncAF\`](${homepage}) methods you'd like to use in your code, rather than pulling in the entire AsyncAF library (A.K.A. [\`async-af\`](https://www.npmjs.com/package/async-af)).

### For more information:

- check out the docs for [\`AsyncAfWrapper\`](${homepage}/AsyncAfWrapper.html);
- for more general setup, take a look at
   - the [AsyncAF docs](${homepage})
   - the main [AsyncAF README](https://github.com/AsyncAF/AsyncAF/blob/master/README.md)
- or just continue reading for an example of how to use \`AsyncAfWrapper\`

### Usage

Say you only want to use [\`mapAF\`](${homepage}/AsyncAF#mapAF), [\`filterAF\`](${homepage}/AsyncAF#filterAF), [\`forEachAF\`](${homepage}/AsyncAF#forEachAF), and [\`logAF\`](${homepage}/AsyncAF#logAF) instead of pulling in the entire AsyncAF library.

First, install the separate packages (e.g., for npm):

\`$ npm install--save @async-af/{wrapper,map,filter,foreach,log}\`

<details style="margin-left: 24px; padding-top: -18px;"><summary><em>Or, if you're on Windows</em></summary><code>
npm install --save @async-af/wrapper @async-af/map @async-af/filter @async-af/includes @async-af/every @async-af/indexof @async-af/some @async-af/reduce @async-af/join @async-af/log
</code></details>
<br>

Then import the packages:

\`\`\`js
import AsyncAF from '@async-af/wrapper'; // aliasing 'AsyncAfWrapper' as 'AsyncAF'
import mapAF from '@async-af/map';
import filterAF from '@async-af/filter';
import forEachAF from '@async-af/foreach';
import logAF from '@async-af/log';
\`\`\`

 _If you'd like to save some vertical screen real estate and cut the imports down to one line, see_ [Wrapper/Use: Too Many 🤬 Imports!?](${homepage}/tutorial-TOO_MANY_IMPORTS.html)

Now call [\`use\`](${homepage}/AsyncAfWrapper.html#use), including all prototype methods you'd like to add to AsyncAfWrapper's prototype in the first argument, \`prototypeMethods\` and all static methods you'd like to add to AsyncAfWrapper in the second optional argument, \`staticMethods\`
\`\`\`js
AsyncAF.use({ // prototype methods go in the first argument
  mapAF,
  filterAF,
  forEachAF
}, { // static methods go in the second argument
  logAF
});
\`\`\`

Ready to go!
\`\`\`js
const promises = [1, 2, 3].map(n => Promise.resolve(n));

AsyncAF(promises).mapAF(n => n * 2).filterAF(n => n !== 4).forEachAF(n => console.log(n));
// logs 2 then 6

AsyncAF.logAF(promises);
// @filename.js:24:9:
//  [ 1, 2, 3 ]
// in 0.003 secs
\`\`\`

**protip:** you can use the same technique to add your own custom prototype or static methods to AsyncAfWrapper or even to the main AsyncAF class; see [\`use\`](${homepage}/AsyncAfWrapper.html#use) for an example.
`;

export default makeWrapperReadme;
