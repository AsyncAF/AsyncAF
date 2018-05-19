<a><img src="https://img.shields.io/bundlephobia/minzip/async-af.svg?style=for-the-badge&amp;label=size&amp;colorB=466EF1" alt="npm package size (min + gzip)"></a>
<a href="https://www.npmjs.com/package/async-af" target=_blank><img src="https://img.shields.io/npm/v/async-af.svg?style=for-the-badge&colorB=cb3837" alt="npm version"></a>
<a href="https://yarnpkg.com/en/package/async-af" target=_blank><img src="https://img.shields.io/npm/v/async-af.svg?label=yarn&style=for-the-badge&colorB=2c8ebb" alt="yarn version"></a>
<a href="https://unpkg.com/async-af/" target=_blank><img src="https://img.shields.io/npm/v/async-af.svg?style=for-the-badge&colorB=ffcc2f&label=unpkg" alt="unpkg version"></a>
<a href="https://codecov.io/gh/AsyncAF/AsyncAF" target=_blank><img src="https://img.shields.io/codecov/c/github/AsyncAF/AsyncAF.svg?style=for-the-badge&label=codecov&colorB=brightgreen" alt=codecov></a>
<a href="https://github.com/AsyncAF/AsyncAF/blob/master/README.md#license"><img src="https://img.shields.io/npm/l/async-af.svg?style=for-the-badge&colorB=aaaaaa" alt="MIT License"></a>
<!-- <a href="https://app.fossa.io/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF/refs/branch/master/" target=_blank><img src="https://img.shields.io/badge/license%20scan-passing-brightgreen.svg?style=for-the-badge&label=fossa" alt="license scan"></a> -->

<p align=center><a href="https://async-af.js.org" target=_blank><img src="https://cdn.rawgit.com/AsyncAF/AsyncAF/1ce388a7/docs/custom/assets/async-af-logo.png"></a></p>

<br>

README in progress...come back another time to lay eyes on the most beautiful documentation you've ever seen! 😍

In the meantime, <a href="https://async-af.js.org/AsyncAF" target="_blank">
  check out the docs!
</a> 🚀

Or, [see how to contribute.](https://github.com/AsyncAF/AsyncAF/blob/master/CONTRIBUTING.md) 💙

## Installation 💾

Easy peazy, just `$ npm install --save async-af`, right?

 ⚠️ Not so fast; there's actually several ways to include AsyncAF in your project/production site from easy to more complex:

<details open><summary>Easy 👍</summary><br>
🔹 <strong>npm:</strong> <code>$ npm install --save async-af</code>

🔸 <strong>yarn:</strong> <code>$ yarn add async-af</code>

🔹 <strong>bower:</strong> <code>async-af</code> is no longer published to bower. To continue using it with bower, look into <a href=https://github.com/mjeanroy/bower-npm-resolver target=_blank><code>bower-npm-resolver</code></a>.

🔸 <strong>cdn:</strong> See the table for which script tag to use:

<table align=left><th>mode</th><th>browsers</th><th>script tag</th>
<tr><td>development</td><td>modern (ES6+)</td><td><code class=language-html>&lt;script src="https&#58;//unpkg.com/async-af/index.js">&lt;/script></code></td></tr>
<tr><td>development</td><td>legacy (ES5+)</td><td><code class=language-html>&lt;script src="https&#58;//unpkg.com/async-af/legacy/index.js">&lt;/script></code></td></tr>
<tr><td>production</td><td>modern (ES6+)</td><td><code class=language-html>&lt;script src="https&#58;//unpkg.com/async-af/min.js">&lt;/script></code></td></tr>
<tr><td>production</td><td>legacy (ES5+)</td><td><code class=language-html>&lt;script src="https&#58;//unpkg.com/async-af/legacy/min.js">&lt;/script></code></td></tr>
</table><br>
</details>
<br>
<details open><summary>More Complex 🤔</summary><br>

🔹 <strong>scoped packages:</strong>

>Instead of pulling in the entire AsyncAF library, you can install smaller standalone packages for each of the AsyncAF methods you intend to use; for example, <code>@async-af/map</code> and/or <code>@async-af/filter</code>; see further instructions in the documentation for <a href="https://async-af.js.org/AsyncAfWrapper" target=_blank>AsyncAfWrapper</a> and <a href="https://async-af.js.org/AsyncAfWrapper#use" target=_blank>AsyncAfWrapper.use</a>.

🔸 <strong>scoped packages + `babel-plugin-transform-imports`:</strong>

>If you use more than a few AsyncAF scoped packages in a file, you might start to build a wall of `import` statements to pull them all in. If this is an eyesore for you, look into <a href="https://www.npmjs.com/package/babel-plugin-transform-imports" target="_blank"><code>babel-plugin-transform-imports</code></a> and condense that ugly wall down to a single `import` statement! See <a href="https://async-af.js.org/tutorial-TOO_MANY_IMPORTS" target=_blank>Wrapper/Use: Too Many 🤬 Imports!?</a> for a tutorial.

🔹 <strong>es modules:</strong>

>AsyncAF as well as its scoped packages are also published as es modules. This gives an opportunity to conditionally load `async-af` with ES6+ features in modern browsers and `async-af` with ES5-compatible features in legacy browsers.
>
>Using the cdn scripts as an example:
>
><pre class=prettyprint>
<code><code class=language-html>&lt;script type="module" src="https&#58;//unpkg.com/async-af/esm/index.js">&lt;/script></code>
<code class=language-html>&lt;script nomodule src="https&#58;//unpkg.com/async-af/legacy/index.js">&lt;/script></code></code>
</pre>
>
>or minimized for production:
>
><pre class=prettyprint>
<code><code class=language-html>&lt;script type="module" src="https&#58;//unpkg.com/async-af/esm/min.js">&lt;/script></code>
<code class=language-html>&lt;script nomodule src="https&#58;//unpkg.com/async-af/legacy/min.js">&lt;/script></code></code>
</pre>

>The script with <code class="language-html prettyprint">&lt;script type="module"></code> will load in any browser capable of loading es modules, while the script with <code class="language-html prettyprint">&lt;script nomodule></code> will act as a fallback for legacy browsers.
>
>See <a href="https://philipwalton.com/articles/deploying-es2015-code-in-production-today/" target=_blank>here</a> and <a href="https://jakearchibald.com/2017/es-modules-in-browsers/" target=_blank>here</a> for further reading on this strategy.
</details>
<br>

## License
AsyncAF is licensed under the <a href="https://choosealicense.com/licenses/mit/" target=_blank>MIT License</a>, so you can pretty much use it however you want

(but [click here](https://github.com/AsyncAF/AsyncAF/blob/master/LICENSE) or <a href="https://app.fossa.io/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF/refs/branch/master/" target=_blank>here</a> to get into specifics).

<a href="https://app.fossa.io/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF/refs/branch/master/" target=_blank><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF.svg?type=large" alt="FOSSA Status"></a>
