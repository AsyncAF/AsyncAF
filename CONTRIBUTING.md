# Contributing

## Workflow

To demonstrate the proper workflow for contributing to AsyncAF, (❤️ Thanks! ❤️) let's say you want to add a hypothetical feature on the AsyncAF prototype; for example, a method that acts on an array of numbers or promises that resolve to numbers and naively adds them up.

<hr>

### Setup

First things first; fork this repo and clone it to your machine.

Once you've got the files open, run `$ npm install` to load up the project's dev-dependencies.

Do whatever you like from the following choices:

1. [run `$ npm start`](#-npm-start-) to concurrently build files and run tests in watch mode

2. Open two terminal tabs and [run `$ npm run build:watch`](#-npm-start-) in one and [run `$ npm run test:watch`](#-npm-start-) in the other

3. Build and test manually after making changes with [`$ npm test`](#-npm-test-)

Setup Complete! 🚀

<hr>

### Building Your Module `||` The Meat of Your Contribution

AsyncAF prototype methods that act on arrays live in `lib/methods/arrays`. If you're contributing a method that acts on objects it would reside in `lib/methods/objects` and so on.

So for our (naive) asynchronous adding module, let's call it `sumAF`, create a new file named `sumAF.js` in the `lib/methods/arrays` directory.

```
AsyncAF/
├── lib/
|   ├── _internal/
|   ├── classes/
|   └── methods/
|       ├── arrays/
|       |   └── sumAF.js
|       ├── objects/
|       └── other/
└── test/
    ├── classes/
    └── methods/
        ├── arrays/
        ├── objects/
        └── other/
```

#### Write the code

On with the logic! 🤓 ...here's some code:

```js
// lib/methods/arrays/sumAF.js

const sumAF = function () {
  return this.then(nums => Promise.all(nums))
    .then(nums => nums.reduce((sum, num) => sum + num));
};

```

Great! Let's assume this works. Next, we'll have to connect the module to the AsyncAF prototype so we can use it.

#### Export the code

This project transpiles ES6 module syntax for builds and tests, so to follow the same style as other modules, at the bottom of the file export your method with `export default yourMethod;`.

```js
// lib/methods/arrays/sumAF.js

/* const sumAF = code... */

export default sumAF;

```

#### Import the code

If it's exported...you guessed it, we've got to import it too...somewhere. Since we want to add this particular method to the AsyncAF prototype, navigate on over to `lib/packageList.js` and scroll down to the `PROTOTYPE METHODS` section. This is where we'll import the new method and add some information about it.

First, append an import statement to the bottom of the other prototype methods that act on arrays, following the style `import methodName from './path/to/your/fileName';`. Then, add your method to the `arrayMethods` array below that.

```js
// packageList.js

// ...

/* ____________________________
  |       STATIC METHODS       |
  |____________________________| */

import logAF from './lib/methods/other/logAF';
// ...
// a new static method would be imported here

const staticMethods = [
  name(logAF, 'logAF'),
  // ...
  // and inserted here
].map(method => [
  method,
  `${libPath}methods/other/${method.name}`,
  makeScoped(method.name),
]);

/* ____________________________
  |      PROTOTYPE METHODS     |
  |____________________________| */

// Arrays:
import mapAF from './lib/methods/arrays/mapAF';
import forEachAF from './lib/methods/arrays/forEachAF';
import filterAF from './lib/methods/arrays/filterAF';
// ...
// import a new prototype method that acts on arrays here
import sumAF from './lib/methods/arrays/sumAF';

const arrayMethods = [
  name(mapAF, 'mapAF'),
  name(forEachAF, 'forEachAF'),
  name(filterAF, 'filterAF'),
  // ...
  // and insert here
  name(sumAF, 'sumAF'), // for performance reasons, name the new method
].map(method => [
  method,
  `${libPath}methods/arrays/${method.name}`,
  makeScoped(method.name),
]);

// ...

```

`packageList.js` is where we keep a central repository of all the AsyncAF methods. Once your shiny new method is added here, it'll automatically be included in AsyncAF or the AsyncAF prototype on builds. Adding a method here also indicates that it will eventually be published as a standalone package.

There! Now `sumAF` should be available on the AsyncAF prototype and be built as a separate scoped package called `@async-af/sum`, which you can verify in the [terminal tab running your builds](#setup).

<hr>

(WIP)

<hr>

## Build/Test/Lint Scripts

#### `$ npm start`
- watches for file changes
- runs webpack to create development build for modern environments only (cached for performance)
- and runs mocha in parallel on `*.test.js` files in the `/test` directory

    - If you're unsatisfied with nyan cat being askew 😾, you can run the tasks in separate terminal tabs with:
        - tab 1: `$ npm run build:watch`
        - tab 2: `$ npm run test:watch`

#### `$ npm test`
- build and test once

#### `$ npm run lint`
- run eslint on all `.js` files
    - This project uses a variation of [`eslint-config-airbnb-base`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base). See [`.eslintrc`](https://github.com/AsyncAF/AsyncAF/blob/master/.eslintrc) for modified rules.

#### `$ npm run build`
- if you'd like to see the output for all packages (what will eventually be published)
    - builds legacy (transpiled to ES5) packages
    - builds minified legacy packages
    - builds modern (minimally transpiled for modern environments) packages
    - builds minified modern packages

#### `$ npm run cover`
- rebuilds modern packages
- runs tests in all `test/**.test.js` files
- and shows coverage report using `nyc`

#### `$ npm run cover:open`
- opens html coverage report in the browser

#### `$ npm run docs`
- generates static html docs based on jsdoc comments
- outputs files to `docs/out`

#### `$ npm run docs:open`
- opens generated docs from local filesystem in the browser

#### `$ npm run docs:publish`
- commits the docs and pushes to your `gh-pages` branch
