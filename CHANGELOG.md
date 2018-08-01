<a name="6.0.0"></a>
# [6.0.0](https://github.com/AsyncAF/AsyncAF/compare/v5.3.3...v6.0.0) (2018-08-01)


### Code Refactoring

* store AsyncAF instance data in a WeakMap for privacy ([36cbaf6](https://github.com/AsyncAF/AsyncAF/commit/36cbaf6))


### Features

* add Symbol.toStringTag to AsyncAF classes for easier debugging ([7f0aa86](https://github.com/AsyncAF/AsyncAF/commit/7f0aa86))


### BREAKING CHANGES

* the inner promise within AsyncAF instances can no longer be accessed at, e.g., AsyncAF().data
* AsyncAF().toString() will now show '[object AsyncAF]' rather than '[object Object]'



<a name="5.3.3"></a>
## [5.3.3](https://github.com/AsyncAF/AsyncAF/compare/v5.3.2...v5.3.3) (2018-07-11)


### Performance Improvements

* remove unnecessary capturing parentheses ([36d8eab](https://github.com/AsyncAF/AsyncAF/commit/36d8eab))



<a name="5.3.2"></a>
## [5.3.2](https://github.com/AsyncAF/AsyncAF/compare/v5.3.1...v5.3.2) (2018-06-11)



<a name="5.3.1"></a>
## [5.3.1](https://github.com/AsyncAF/AsyncAF/compare/v5.3.0...v5.3.1) (2018-05-24)



<a name="5.3.0"></a>
# [5.3.0](https://github.com/AsyncAF/AsyncAF/compare/v5.2.0...v5.3.0) (2018-05-24)


### Bug Fixes

* **concat:** fix concat's handling of nested promises ([99a5ecc](https://github.com/AsyncAF/AsyncAF/commit/99a5ecc))


### Features

* **concat:** implement concatAF method ([b7fbf43](https://github.com/AsyncAF/AsyncAF/commit/b7fbf43))



<a name="5.2.0"></a>
# [5.2.0](https://github.com/AsyncAF/AsyncAF/compare/v5.1.1...v5.2.0) (2018-05-21)


### Features

* **finally:** add finally method to AsyncAF & AsyncAfWrapper ([8d6bf2e](https://github.com/AsyncAF/AsyncAF/commit/8d6bf2e))



<a name="5.1.1"></a>
## [5.1.1](https://github.com/AsyncAF/AsyncAF/compare/v5.1.0...v5.1.1) (2018-05-20)



<a name="5.1.0"></a>
# [5.1.0](https://github.com/AsyncAF/AsyncAF/compare/v5.0.1...v5.1.0) (2018-05-20)


### Bug Fixes

* **es modules:** prevent minified classes from utlizing arrow functions ([3eb897b](https://github.com/AsyncAF/AsyncAF/commit/3eb897b))


### Features

* **perf:** reduce minified packages sizes by 1-18% ([f4d459e](https://github.com/AsyncAF/AsyncAF/commit/f4d459e))
* **split:** implement splitAF method ([24c9ee4](https://github.com/AsyncAF/AsyncAF/commit/24c9ee4)), closes [#37](https://github.com/AsyncAF/AsyncAF/issues/37)



<a name="5.0.1"></a>
## [5.0.1](https://github.com/AsyncAF/AsyncAF/compare/v5.0.0...v5.0.1) (2018-05-18)


### Bug Fixes

* **log:** fix bug in minified logAF method ([1044b24](https://github.com/AsyncAF/AsyncAF/commit/1044b24))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/AsyncAF/AsyncAF/compare/v4.0.0...v5.0.0) (2018-05-18)


### Code Refactoring

* **log:** refactor logAF custom format ([bf0ff59](https://github.com/AsyncAF/AsyncAF/commit/bf0ff59))


### BREAKING CHANGES

* **log:** logAF custom format no longer pulls variables from a string



<a name="4.0.0"></a>
# [4.0.0](https://github.com/AsyncAF/AsyncAF/compare/v3.5.0...v4.0.0) (2018-05-17)


### Code Refactoring

* change variable names when packages are exposed as variables ([1df6de4](https://github.com/AsyncAF/AsyncAF/commit/1df6de4))


### Features

* all array methods can now be used on array-like objects as well ([e3bd389](https://github.com/AsyncAF/AsyncAF/commit/e3bd389))
* **es modules:** dev/min packages now available as es modules ([4afd961](https://github.com/AsyncAF/AsyncAF/commit/4afd961))
* **join:** implement joinAF method ([3767ca2](https://github.com/AsyncAF/AsyncAF/commit/3767ca2))
* **lastindexof:** implement lastIndexOfAF method ([c4adcf1](https://github.com/AsyncAF/AsyncAF/commit/c4adcf1))
* **perf:** reduce dev bundle sizes 4-5.6% w/ ModuleConcatenationPlugin ([01fb955](https://github.com/AsyncAF/AsyncAF/commit/01fb955))
* **use:** refactor 'use' method to accept static methods as well ([6be45ca](https://github.com/AsyncAF/AsyncAF/commit/6be45ca))


### BREAKING CHANGES

* variable names will now match each member's name in the docs (e.g., AsyncAF, AsyncAfWrapper, mapAF, logAF)



<a name="3.5.0"></a>
# [3.5.0](https://github.com/AsyncAF/AsyncAF/compare/v3.4.0...v3.5.0) (2018-05-06)


### Features

* **find:** implement findAF method ([2bb538e](https://github.com/AsyncAF/AsyncAF/commit/2bb538e))
* **findindex:** implement findIndexAF method ([7c34711](https://github.com/AsyncAF/AsyncAF/commit/7c34711))
* **indexof:** implement indexOfAF method ([1cd2377](https://github.com/AsyncAF/AsyncAF/commit/1cd2377))



<a name="3.4.0"></a>
# [3.4.0](https://github.com/AsyncAF/AsyncAF/compare/v3.3.1...v3.4.0) (2018-05-06)


### Features

* **includes:** implement includesAF method ([4e2e8dc](https://github.com/AsyncAF/AsyncAF/commit/4e2e8dc))



<a name="3.3.1"></a>
## [3.3.1](https://github.com/AsyncAF/AsyncAF/compare/v3.3.0...v3.3.1) (2018-05-06)



<a name="3.3.0"></a>
# [3.3.0](https://github.com/AsyncAF/AsyncAF/compare/v3.2.5...v3.3.0) (2018-05-05)


### Features

* **some:** implement someAF method ([f119291](https://github.com/AsyncAF/AsyncAF/commit/f119291))



<a name="3.2.5"></a>
## [3.2.5](https://github.com/AsyncAF/AsyncAF/compare/v3.2.4...v3.2.5) (2018-05-04)



<a name="3.2.4"></a>
## [3.2.4](https://github.com/AsyncAF/AsyncAF/compare/v3.2.3...v3.2.4) (2018-05-04)



<a name="3.2.3"></a>
## [3.2.3](https://github.com/AsyncAF/AsyncAF/compare/v3.2.2...v3.2.3) (2018-05-04)



<a name="3.2.2"></a>
## [3.2.2](https://github.com/AsyncAF/AsyncAF/compare/v3.2.1...v3.2.2) (2018-05-04)



<a name="3.2.1"></a>
## [3.2.1](https://github.com/AsyncAF/AsyncAF/compare/v3.2.0...v3.2.1) (2018-05-04)



<a name="3.2.0"></a>
# [3.2.0](https://github.com/AsyncAF/AsyncAF/compare/v3.1.0...v3.2.0) (2018-05-04)


### Features

* **every:** implement everyAF method ([ee24c58](https://github.com/AsyncAF/AsyncAF/commit/ee24c58))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/AsyncAF/AsyncAF/compare/v3.0.0...v3.1.0) (2018-05-03)


### Features

* **reduce:** implement reduceAF method ([d67358a](https://github.com/AsyncAF/AsyncAF/commit/d67358a))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/AsyncAF/AsyncAF/compare/v2.0.0...v3.0.0) (2018-05-02)


### Bug Fixes

* **githooks:** update husky so githook for commitlint works in npm 6.0.0 ([4e36818](https://github.com/AsyncAF/AsyncAF/commit/4e36818))
* don't mangle function names to prevent bugs in minified files ([31bd350](https://github.com/AsyncAF/AsyncAF/commit/31bd350))
* set --add (-a) flag so gh-pages doesn't delete .circleci for docs PRs ([5e89316](https://github.com/AsyncAF/AsyncAF/commit/5e89316))
* use [filebase] instead of [file] in banner so parent dir doesn't show up after refactor ([931c1b2](https://github.com/AsyncAF/AsyncAF/commit/931c1b2))
* **log:** fixed case where logAF would throw when aliased ([e511ec5](https://github.com/AsyncAF/AsyncAF/commit/e511ec5))
* **logAF:** fix bug where incorrect filename would log when using minified files ([351b696](https://github.com/AsyncAF/AsyncAF/commit/351b696))


### Code Refactoring

* **bower:** delete bower.json & stop releasing to bower ([93acf2a](https://github.com/AsyncAF/AsyncAF/commit/93acf2a))


### Features

* make 'AF-less' aliases available (e.g., mapAF -> map) ([cd44a77](https://github.com/AsyncAF/AsyncAF/commit/cd44a77))
* revert to previous way of preserving function arity w/ rest params instead of arguments obj ([d75dd8f](https://github.com/AsyncAF/AsyncAF/commit/d75dd8f))


### BREAKING CHANGES

* **bower:** updates no longer released to bower



<a name="2.0.0"></a>
# [2.0.0](https://github.com/AsyncAF/AsyncAF/compare/v1.6.0...v2.0.0) (2017-12-02)



<a name="1.6.0"></a>
# [1.6.0](https://github.com/AsyncAF/AsyncAF/compare/v1.5.0...v1.6.0) (2017-11-22)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/AsyncAF/AsyncAF/compare/v1.4.1...v1.5.0) (2017-11-20)



<a name="1.4.1"></a>
## [1.4.1](https://github.com/AsyncAF/AsyncAF/compare/v1.4.0...v1.4.1) (2017-11-18)



<a name="1.4.0"></a>
# [1.4.0](https://github.com/AsyncAF/AsyncAF/compare/v1.3.0...v1.4.0) (2017-11-18)



<a name="1.3.0"></a>
# [1.3.0](https://github.com/AsyncAF/AsyncAF/compare/v1.2.0...v1.3.0) (2017-11-07)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/AsyncAF/AsyncAF/compare/v1.1.1...v1.2.0) (2017-11-07)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/AsyncAF/AsyncAF/compare/v1.1.0...v1.1.1) (2017-11-05)



<a name="1.1.0"></a>
# 1.1.0 (2017-11-03)



