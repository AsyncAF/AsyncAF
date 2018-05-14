![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/async-af.svg?style=for-the-badge&label=size&colorB=466EF1)
[![npm version](https://img.shields.io/npm/v/async-af.svg?style=for-the-badge&colorB=cb3837)](https://www.npmjs.com/package/async-af)
[![yarn version](https://img.shields.io/npm/v/async-af.svg?label=yarn&style=for-the-badge&colorB=2c8ebb)](https://yarnpkg.com/en/package/async-af)
[![unpkg version](https://img.shields.io/npm/v/async-af.svg?style=for-the-badge&colorB=ffcc2f&label=unpkg)](https://unpkg.com/async-af/)
[![codecov](https://img.shields.io/codecov/c/github/AsyncAF/AsyncAF.svg?style=for-the-badge&label=codecov&colorB=brightgreen)](https://codecov.io/gh/AsyncAF/AsyncAF)
[![MIT License](https://img.shields.io/npm/l/async-af.svg?style=for-the-badge&colorB=aaaaaa)](https://github.com/AsyncAF/AsyncAF/blob/master/README.md#license)
<!-- [![license scan](https://img.shields.io/badge/license%20scan-passing-brightgreen.svg?style=for-the-badge)](https://app.fossa.io/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF/refs/branch/master/) -->

<center><a href="https://async-af.js.org" target=_blank><img src="docs/custom/assets/async-af-logo.png"></a></center>

<br>

README in progress...come back another time to lay eyes on the most beautiful documentation you've ever seen! 😍

In the meantime, <a href="https://async-af.js.org/AsyncAF" target="_blank">
  check out the docs!
</a> 🚀

Or, [see how to contribute.](https://github.com/AsyncAF/AsyncAF/blob/master/CONTRIBUTING.md) 💙

## Installation 💾

Easy peazy, just `$ npm install --save async-af`, right?

 ⚠️ Not so fast; there's actually many ways to include AsyncAF in your project/production site from easy to more complex:

<details open><summary>Easy 👍</summary><br>
🔹 <strong>npm:</strong> <code>$ npm install --save async-af</code>

🔸 <strong>yarn:</strong> <code>$ yarn add async-af</code>

🔹 <strong>bower:</strong> <code>async-af</code> is no longer published to bower. To continue using it with bower, look into <a href=https://github.com/mjeanroy/bower-npm-resolver><code>bower-npm-resolver</code></a>.

🔸 <strong>cdn:</strong> See the table for which script tag to use:
<table align=left><th>mode</th><th>browsers</th><th>script tag</th>
<tr><td>development</td><td>modern (ES6+)</td><td><code>&lt;script src="https&#58;//unpkg.com/async-af/index.js">&lt;/script></code></td></tr>
<tr><td>development</td><td>legacy (ES5+)</td><td><code>&lt;script src="https&#58;//unpkg.com/async-af/legacy/index.js">&lt;/script></code></td></tr>
<tr><td>production</td><td>modern (ES6+)</td><td><code>&lt;script src="https&#58;//unpkg.com/async-af/min.js">&lt;/script></code></td></tr>
<tr><td>production</td><td>legacy (ES5+)</td><td><code>&lt;script src="https&#58;//unpkg.com/async-af/legacy/min.js">&lt;/script></code></td></tr>
</table><br>
</details>
<br>
<details open><summary>More Complex 🤔</summary><br>

🔹 <strong>using scoped packages:</strong>

> <p color=black>Instead of pulling in the entire AsyncAF library, you can install smaller standalone packages for each of the AsyncAF methods you intend to use; for example, <code>@async-af/map</code> and/or <code>@async-af/filter</code>; see further instructions in the documentation for <a href="https://async-af.js.org/AsyncAfWrapper" target=_blank>AsyncAfWrapper</a> and <a href="https://async-af.js.org/AsyncAfWrapper#use" target=_blank>AsyncAfWrapper.use</a>.</p>

🔸 <strong>using scoped packages + `babel-plugin-transform-imports`:</strong>

><p>If you use more than few AsyncAF scoped packages in a file, you might start to build a wall of `import` statements to pull them all in. If this is an eyesore for you, look into <a href="https://www.npmjs.com/package/babel-plugin-transform-imports" target="_blank"><code>babel-plugin-transform-imports</code></a> and condense that ugly wall down to a single `import` statement! See <a href="https://async-af.js.org/tutorial-TOO_MANY_IMPORTS" target=_blank>Wrapper/Use: Too Many 🤬 Imports!?</a> for a tutorial.</p>
</details>
<br>

## License
AsyncAF is licensed under the [MIT License](https://choosealicense.com/licenses/mit/), so you can pretty much use it however you want

(but [click here](https://github.com/AsyncAF/AsyncAF/blob/master/LICENSE) or [here](https://app.fossa.io/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF/refs/branch/master/) to get into specifics).

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF/refs/branch/master/)
