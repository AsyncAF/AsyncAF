<a name="3.2.3"></a>
# [3.2.3](https://github.com/AsyncAF/AsyncAF/compare/v3.2.2...v3.2.3) (2018-05-04)


<a name="3.2.2"></a>
# [3.2.2](https://github.com/AsyncAF/AsyncAF/compare/v3.2.1...v3.2.2) (2018-05-04)


<a name="3.2.1"></a>
# [3.2.1](https://github.com/AsyncAF/AsyncAF/compare/v3.2.0...v3.2.1) (2018-05-03)


<a name="3.2.0"></a>
# [3.2.0](https://github.com/AsyncAF/AsyncAF/compare/v3.1.0...v3.2.0) (2018-05-03)


### Features

* **every:** implement everyAF method ([ee24c58](https://github.com/AsyncAF/AsyncAF/commit/ee24c58))


<a name="3.1.0"></a>
# [3.1.0](https://github.com/AsyncAF/AsyncAF/compare/v3.0.0...v3.1.0) (2018-05-03)


### Features

* **reduce:** implement reduceAF method ([d67358a](https://github.com/AsyncAF/AsyncAF/commit/d67358a))


<a name="3.0.0"></a>
# [3.0.0](https://github.com/AsyncAF/AsyncAF/compare/v2.0.0...v3.0.0) (2018-05-02)


### Bug Fixes

* **log:** fixed case where logAF would throw when aliased

  specifically, calling an aliased logAF added as a static method to AsyncAfWrapper ([e511ec5](https://github.com/AsyncAF/AsyncAF/commit/e511ec5))


<a name="3.0.0-prerelease.3"></a>
# [3.0.0-prerelease.3](https://github.com/AsyncAF/AsyncAF/compare/v2.0.0...v3.0.0-prerelease.3) (2018-05-02)


### Bug Fixes

* don't mangle function names to prevent bugs in minified files ([31bd350](https://github.com/AsyncAF/AsyncAF/commit/31bd350))


### Code Refactoring

* **bower:** delete bower.json & stop releasing to bower ([93acf2a](https://github.com/AsyncAF/AsyncAF/commit/93acf2a))


### BREAKING CHANGES

* **bower:** updates no longer released to bower


<a name="3.0.0-prerelease.2"></a>
# [3.0.0-prerelease.2](https://github.com/AsyncAF/AsyncAF/compare/v2.0.0...v3.0.0-prerelease.2) (2018-05-01)


### Bug Fixes

* **githooks:** update husky so githook for commitlint works in npm 6.0.0 ([4e36818](https://github.com/AsyncAF/AsyncAF/commit/4e36818))


### Features

* make 'AF-less' aliases available (e.g., mapAF -> map) ([cd44a77](https://github.com/AsyncAF/AsyncAF/commit/cd44a77))


<a name="3.0.0-prerelease.1"></a>
# [3.0.0-prerelease.1](https://github.com/AsyncAF/AsyncAF/compare/v2.0.0...v3.0.0-prerelease.1) (2018-05-01)


### Bug Fixes

* **logAF:** fix bug where incorrect filename would log when using minified files ([351b696](https://github.com/AsyncAF/AsyncAF/commit/351b696))
* set --add (-a) flag so gh-pages doesn't delete .circleci for docs PRs ([5e89316](https://github.com/AsyncAF/AsyncAF/commit/5e89316))
* use [filebase] instead of [file] in banner so parent dir doesn't show up after refactor ([931c1b2](https://github.com/AsyncAF/AsyncAF/commit/931c1b2))


### Features

* revert to previous way of preserving function arity w/ rest params instead of arguments obj ([d75dd8f](https://github.com/AsyncAF/AsyncAF/commit/d75dd8f))
