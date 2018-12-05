<a><img src="https://img.shields.io/bundlephobia/minzip/async-af.svg?style=for-the-badge&amp;label=size&amp;colorB=466EF1" alt="npm package size (min + gzip)"></a>
<a href="https://www.npmjs.com/package/async-af" target=_blank><img src="https://img.shields.io/npm/v/async-af.svg?style=for-the-badge&colorB=cb3837" alt="npm version"></a>
<a href="https://yarnpkg.com/en/package/async-af" target=_blank><img src="https://img.shields.io/npm/v/async-af.svg?label=yarn&style=for-the-badge&colorB=2c8ebb" alt="yarn version"></a>
<a href="https://unpkg.com/async-af/" target=_blank><img src="https://img.shields.io/npm/v/async-af.svg?style=for-the-badge&colorB=ffcc2f&label=unpkg" alt="unpkg version"></a>
<a href="https://codecov.io/gh/AsyncAF/AsyncAF" target=_blank><img src="https://img.shields.io/codecov/c/github/AsyncAF/AsyncAF.svg?style=for-the-badge&label=codecov&colorB=brightgreen" alt=codecov></a>
<a href="https://github.com/AsyncAF/AsyncAF/blob/master/README.md#license"><img src="https://img.shields.io/npm/l/async-af.svg?style=for-the-badge&colorB=aaaaaa" alt="MIT License"></a>

<p align=center><a href="https://async-af.js.org" target=_blank><img src="https://cdn.rawgit.com/AsyncAF/AsyncAF/1ce388a7/docs/custom/assets/async-af-logo.png"></a></p>

<br>

Working with promises or async/await?

Use AsyncAF to transform your code into beautiful asynchronous JavaScript chains, with methods similar to the ones we all know (and love! 😍) such as `map`, `forEach`, `filter`, `reduce`, and more.

<a href="https://async-af.js.org/AsyncAF" target=_blank>
  Check out the docs
</a> for all available methods. 💙
<br>

## Usage

```js
const AsyncAF = require('async-af');

function getActiveUsers(userIds) {
  return AsyncAF(userIds)
    // map user ids to user objects with an async function
    .mapAF(async userId => {
      const user = await fetch(`fake-game-api/users/${userId}`);
      return user.json();
    })
    // filter by active users
    .filterAF(user => user.isActive);
}
```

AsyncAF methods are await-able and then-able.

```js
async function sendMsgToActiveUsers(msg) {
  const activeUsers = await getActiveUsers([1, 2, 3]);
  // send each active user a msg in series
  await AsyncAF(activeUsers).series.forEachAF(async ({id}) => {
    await sendMsg(id, msg); // hypothetical msg service that's rate-limited
  });
  console.log('message sent!');
}

function doSomethingElseWithActiveUsers() {
  return getActiveUsers([1, 2, 3]).then(activeUsers => {
    // ... do something else
  });
}
```

If a `Promise` is passed into <a href="https://async-af.js.org/AsyncAF" target=_blank>`AsyncAF`</a>, it will be settled before a method processes it.

```js
const userMsg = Promise.resolve('I\'m [restricted word] AF right now')

const msgContainsBadWord = (msg, word = '[restricted word]') => AsyncAF(msg).includesAF(word);

msgContainsBadWord(userMsg); // resolves to true
```

`Array` methods will settle any promises in an array before processing them.

```js
const findHighScoringUser = () => AsyncAF([
  fetch('fake-game-api/users/1').then(user => user.json()), // {id: 1, name: Aiden, score: 9001, ...}
  {id: 2, name: 'Bill', score: 3600, /* ... */},
  {id: 3, name: 'Cari', score: 5800, /* ... */},
])
  .findAF(({score}) => score > 9000);

findHighScoringUser(); // resolves to {id: 1, name: Aiden, score: 9001, ...}
```

**Note**: All `'AF'` methods have an `'AF-less'` alias so you can choose whether or not to make it obvious that they're AsyncAF methods.

For example:

```js
const promises = [1, 2, 3].map(n => Promise.resolve(n));

AsyncAF(promises).map(n => n * 2).filter(n => n !== 4).forEach(n => console.log(n));
// or
AsyncAF(promises).mapAF(n => n * 2).filterAF(n => n !== 4).forEachAF(n => console.log(n));
// both log 2 then 6
```

## Installation 💾

Easy peasy, just

`$ npm install --save async-af`,

right?

 ⚠️ Not so fast; there's actually several ways to include AsyncAF in your project/production site from easy to more complex:

<details><summary>Easy 👍</summary><br>
🔹 <strong>npm:</strong> <code>$ npm install --save async-af</code>

🔸 <strong>yarn:</strong> <code>$ yarn add async-af</code>

🔹 <strong>bower:</strong> <code>async-af</code> is no longer published to bower. To continue using it with bower, look into <a href="https://github.com/mjeanroy/bower-npm-resolver" target=_blank><code>bower-npm-resolver</code></a>.

🔸 <strong>cdn:</strong> See the table for which script tag to use:

<table align=left><th>mode</th><th>browsers</th><th>script tag</th>
<tr><td>development</td><td>modern (ES6+)</td><td><code class=language-html>&lt;script src="https&#58;//unpkg.com/async-af/index.js">&lt;/script></code></td></tr>
<tr><td>development</td><td>legacy (ES5+)</td><td><code class=language-html>&lt;script src="https&#58;//unpkg.com/async-af/legacy/index.js">&lt;/script></code></td></tr>
<tr><td>production</td><td>modern (ES6+)</td><td><code class=language-html>&lt;script src="https&#58;//unpkg.com/async-af/min.js">&lt;/script></code></td></tr>
<tr><td>production</td><td>legacy (ES5+)</td><td><code class=language-html>&lt;script src="https&#58;//unpkg.com/async-af/legacy/min.js">&lt;/script></code></td></tr>
</table><br>
</details>
<br>
<details><summary>More Complex 🤔</summary><br>

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
><code><code class=language-html>&lt;script type="module" src="https&#58;//unpkg.com/async-af/esm/index.js">&lt;/script></code>
><code class=language-html>&lt;script nomodule src="https&#58;//unpkg.com/async-af/legacy/index.js">&lt;/script></code></code></pre>
>
>or minimized for production:
>
><pre class=prettyprint>
><code><code class=language-html>&lt;script type="module" src="https&#58;//unpkg.com/async-af/esm/min.js">&lt;/script></code>
><code class=language-html>&lt;script nomodule src="https&#58;//unpkg.com/async-af/legacy/min.js">&lt;/script></code></code></pre>

>The script with <code class="language-html prettyprint">&lt;script type="module"></code> will load in any browser capable of loading es modules, while the script with <code class="language-html prettyprint">&lt;script nomodule></code> will act as a fallback for legacy browsers.
>
>See <a href="https://philipwalton.com/articles/deploying-es2015-code-in-production-today/" target=_blank>here</a> and <a href="https://jakearchibald.com/2017/es-modules-in-browsers/" target=_blank>here</a> for further reading on this strategy.
</details>
<br>

## A couple notes on performance 🚀

#### Built on Promises

Despite AsyncAF's name (Async/Await Fun), its source code is written entirely without the use of `async/await`. Its chainable asynchronous JavaScript methods _are_, however, highly useful when _your_ code makes use of `async/await` or `Promises`. This is important for performance because transpiling an `async function` with babel currently <a href="https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161" target=_blank>results in some loooong code</a> due to pulling in things like <a href="https://facebook.github.io/regenerator/" target=_blank>Facebook's regenerator</a> and others to make it work.

Because AsyncAF instead runs your code with Promises behind the scenes, there's no need to transpile `async/await` in its ES6 or ES5-compatible distributions. This boils down to much smaller bundles when compared to an equivalent async library written _with_ `async/await`.

#### Use <a href="https://async-af.js.org/AsyncAF#series" target=_blank>`series`</a> wisely

The majority of AsyncAF's `Array` methods process promises in parallel by default. However, many methods have an option to process promises in series as well. You can tell AsyncAF to process promises in series within the next method invocation by setting a flag with `series` or its alias `io` (in order). See the documentation for <a href="https://async-af.js.org/AsyncAF#series" target=_blank>`series`</a> for a full list of methods this works on.

In some cases, the time it takes to resolve an AsyncAF expression won't differ; for example:

```js
import AsyncAF, {logAF} from 'async-af';
import delay from 'delay';

logAF.options({label: false});

const bools = [
  () => delay(3000, {value: true}),
  () => delay(2000, {value: false}),
  () => delay(1000, {value: false}),
];

logAF('parallel', AsyncAF(bools).someAF(n => n()));
logAF('series', AsyncAF(bools).series.someAF(n => n()));

// series true
// in 3.000 secs
// parallel true
// in 3.000 secs
```

Other times, processing promises in parallel will be faster:

```js
const bools = [
  () => delay(3000, {value: false}),
  () => delay(2000, {value: true}),
  () => delay(1000, {value: false}),
];

logAF('parallel', AsyncAF(bools).someAF(n => n()));
logAF('series', AsyncAF(bools).series.someAF(n => n()));

// parallel true
// in 3.000 secs
// series true
// in 5.000 secs
```

And yet other times, processing promises in series will be faster:

```js
const bools = [
  () => delay(3000, {value: true}),
  () => delay(4000, {value: false}),
  () => delay(5000, {value: false}),
];

logAF('parallel', AsyncAF(bools).someAF(n => n()));
logAF('series', AsyncAF(bools).series.someAF(n => n()));

// series true
// in 3.000 secs
// parallel true
// in 5.000 secs
```

Being cognizant of when to use `series` vs. when to rely on the default parallel behavior can help increase the performance of your asynchronous code.

Another use case for `series` might be if you're sending multiple requests to a rate-limited API. In that case you may not want to throw a ton of parallel requests at the API, but rather wait for each one in series.

<div>Love AsyncAF? <a href="https://github.com/AsyncAF/AsyncAF"><img src="https://badgen.net/badge//star/blue?icon=github" alt="star it on GitHub"></a></div>

See something to improve? [File an issue](https://github.com/AsyncAF/AsyncAF/issues) or
[see how to contribute](https://github.com/AsyncAF/AsyncAF/blob/master/CONTRIBUTING.md).💙

## License
AsyncAF is licensed under the <a href="https://choosealicense.com/licenses/mit/" target=_blank>MIT License</a>, so you can pretty much use it however you want

(but [click here](https://github.com/AsyncAF/AsyncAF/blob/master/LICENSE) or <a href="https://app.fossa.io/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF/refs/branch/master/" target=_blank>here</a> to get into specifics).

<a href="https://app.fossa.io/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF/refs/branch/master/" target=_blank><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2FAsyncAF%2FAsyncAF.svg?type=large" alt="FOSSA Status"></a>
