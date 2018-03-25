# Contributing
(in progress)
## Build/Test/Lint Scripts

#### `$ npm start`
- watches for file changes
- runs webpack to create development build for modern environments only (cached for performance)
- and runs mocha in parallel on `*.test.js` files in the `/test` directory

    - If you're unsatisfied with the reporter being askew, you can run the tasks in separate terminal tabs with:
        - tab 1: `$ npm run build:watch`
        - tab 2: `$ npm run test:watch`

#### `$ npm test`
- build and test once

#### `$ npm run lint`
- run eslint on all `.js` files
    - This project uses a variation of [`eslint-config-airbnb-base`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base). See [`.eslintrc`](https://github.com/AsyncAF/AsyncAF/blob/master/.eslintrc) for modified rules.

#### `$ npm run build`
- if you'd like to see the output for all packages (what will eventually be published)
    - builds legacy (transpiled to ES5) packages - `*.legacy.js`
    - builds minified legacy packages - `*.legacy.min.js`
    - builds modern (minimally transpiled for modern environments) packages - `*.modern.js`
    - builds minified modern packages - `*.modern.min.js`

#### `$ npm run cover`
- rebuilds all packages
- then runs tests on all `.js` files
- and shows coverage report using `nyc`
