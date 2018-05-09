_...or How to Use `babel-plugin-transform-imports`_
<br><br>
<hr><br>
<span style="font: 72px Times New Roman, serif; color: #ADACB5; float: left; margin-right: 3px; line-height: .12;">I</span>f you're pulling in AsyncAF's standalone scoped packages (`@async-af/map`, `@async-af/wrapper`, etc.), strategically using {@link AsyncAfWrapper AsyncAfWrapper} and {@link AsyncAfWrapper#use use} to pull in only what you need, you may have ended up with something like this:

### The Too Many Imports Way 🙀

```js
// hypothetically awesome file that uses wrapper, map, filter, includes, every, indexof, some, reduce, join, and log

import AsyncAF from '@async-af/wrapper';
import mapAF from '@async-af/map';
import filterAF from '@async-af/filter';
import includesAF from '@async-af/includes';
import everyAF from '@async-af/every';
import indexOfAF from '@async-af/indexof';
import someAF from '@async-af/some';
import reduceAF from '@async-af/reduce';
import joinAF from '@async-af/join';
import logAF from '@async-af/log';

AsyncAF.use({
  // ...all the methods
});

// ...more sweet sweet code

```

Using another tool; however, we can condense all those damned line-taking-up imports into a single line.

#### How to Do It⁉️

###### Installation

First, install the individual AsyncAF packages as usual (npm, yarn, etc.).

```
npm install --save @async-af/{wrapper,map,filter,includes,every,indexof,some,reduce,join,log}
```
<details style="margin-left: 24px; padding-top: -18px;"><summary><em>Or, if you're on Windows,</em></summary>
```
npm install --save @async-af/wrapper @async-af/map @async-af/filter @async-af/includes @async-af/every @async-af/indexof @async-af/some @async-af/reduce @async-af/join @async-af/log
```
</details>

<br>
Also install <a href="https://www.npmjs.com/package/babel-plugin-transform-imports" target="_blank"><code>babel-plugin-transform-imports</code></a>; this is where the magic happens.

```
npm install --save-dev babel-plugin-transform-imports
```

You can follow along in `babel-plugin-transform-imports`'s README if your setup is a bit different. There's <a href="https://webpack.js.org/" target=_blank>webpack</a> instructions there too. For our purposes, we'll assume you're already using <a href="https://babeljs.io/" target=_blank>babel</a> for transpiling.
<br><br>
###### _.babelrc or variant_

Wherever your babel configuration lives (`.babelrc`, etc.), add to your plugins, `transform-imports` and add `async-af` to the list of libraries to transform as follows:

```json
{
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "async-af": {
          "transform": "@async-af/${member}",
          "preventFullImport": true
        }
      }
    ]
  ]
}
```

<details><summary>Note if you're using AsyncAF in production code</summary>
Don't forget to use the appropriate version if you need production/minified code or if you're targeting legacy browsers. If so, replace the path in `"transform": "@async-af/${member}"` with:
<br>
<table align=left><th align=left style="padding: 0px 30px 0px 30px">mode</th><th align=left style="padding: 0px 30px 0px 30px">browsers</th><th align=left style="padding: 0px 30px 0px 30px">path</th><br>
<tr><td style="padding: 0px 30px 0px 30px">development</td><td style="padding: 0px 30px 0px 30px">modern (ES6+)</td><td style="padding: 0px 30px 0px 30px"><code>@async-af/${member}</code></td></tr>
<tr><td style="padding: 0px 30px 0px 30px">development</td><td style="padding: 0px 30px 0px 30px">legacy (ES5+)</td><td style="padding: 0px 30px 0px 30px"><code>@async-af/${member}/legacy</code></td></tr>
<tr><td style="padding: 0px 30px 0px 30px">production</td><td style="padding: 0px 30px 0px 30px">modern (ES6+)</td><td style="padding: 0px 30px 0px 30px"><code>@async-af/${member}/min</code></td></tr>
<tr><td style="padding: 0px 30px 0px 30px">production</td><td style="padding: 0px 30px 0px 30px">legacy (ES5+)</td><td style="padding: 0px 30px 0px 30px"><code>@async-af/${member}/legacy/min</code></td></tr>
</table>

<br>
</details>

### You Did It: A Nice One-Liner 😻

Now, with the babel plugin up and running _(make sure you've installed any peer dependencies for babel)_, you can refactor that wall of imports to something more succinct and _sophisticated_: 🥃

```js
// hypothetically awesome file that uses wrapper, map, filter, includes, every, indexof, some, reduce, join, and log

import {wrapper as AsyncAF, map, filter, includes, every, indexOf, some, reduce, join, log} from 'async-af';

AsyncAF.use({
  // ...all the methods
});

// ...more sweet sweet code

```

#### _Caveats; however_

While the imported method names are case-insensitive (e.g., `@async-af/indexof` vs. `indexOf`—as imported above); they must be "AF-less" (`map` vs. `mapAF`) when using this plugin.

If it's important to you that the AsyncAF methods you use be clearly differentiated from native methods with trailing "AF"s, then you can use `import`_` package`_` as `_`packageAF`_ syntax, although the result is clearly not as concise:

```js
import {wrapper as AsyncAF, map as mapAF, filter as filterAF, includes as includesAF, every as everyAF, indexOf as indexOfAF, some as someAF, reduce as reduceAF, join as joinAF, log as logAF} from 'async-af';
```

Alternatively, you can alias the methods when you add them to {@link AsyncAfWrapper `AsyncAfWrapper`} via the {@link AsyncAfWrapper#use `use`} method:

```js
import {wrapper as AsyncAF, map, filter, includes, every, indexOf, some, reduce, join, log} from 'async-af';

AsyncAF.use({
  mapAF: map,
  filterAF: filter,
  // ... etc.
}, {
  logAF: log
});

```
