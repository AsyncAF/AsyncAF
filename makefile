.SILENT:
.PHONY: $(MAKECMDGOALS)

start:
	concurrently "npm run build:watch" "npm run test:watch"

test:
	npm run build:dev
	npm run test:base

cover:
	echo "\n\033[0;36mbuilding modern packages...\033[0m 📦\n"
	npm run build\:dev -- --env.cover
	echo "\n\033[0;36mrunning tests & creating coverage report... 🤔\n"
	nyc --check-coverage -- npm run test:base
	echo "\n\033[0;36mopen \033[4;36mfile://"$(CURDIR)"/coverage/lcov-report/index.html\033[0;36m to view generated report in the browser\n\033[0;33m\nor run \033[0;31m'$$ \033[0mnpm run cover:open\033[0;31m'\033[0m\n"

lint:
	echo "\n\033[0;36meslint's a linting...\033[0m 🤨"
	eslint . --ext .js && echo "\n\033[0;33mlooks good!\033[0m 🚀\n"

build:
	rm -rf dist
	make build-package.jsons
	echo "\n\033[0;33mbuilding modern & legacy packages...\033[0m  🏗️\n"
	webpack --mode development --env.legacy
	webpack --mode development --env.modern
	webpack --mode production --env.legacy
	webpack --mode production --env.modern
	echo "\n\033[0;36mbuilds complete!\033[0m 📦\n"

docs:
	echo "\ngenerating docs... 📝\n"
	jsdoc -c docs/jsdoc.conf.js -R README.md
	babel-node docs/custom/fixHashDot
	babel-node docs/custom/fixThisArg
	babel-node docs/custom/fixLogAfOptions
	babel-node docs/custom/fixEOF
	babel-node docs/custom/alterSignature
	echo "done!\n\n\033[0;36mplease open \033[4;36mfile://"$(CURDIR)"/docs/out/index.html\033[0;36m in the browser\nor run \033[0;31m'$$\033[0m npm run docs:open\033[0;31m'\033[0;36m for a preview\n\n\033[0;33mif satisfied, run \033[0;31m'$$\033[0m npm run docs:publish\033[0;31m'\033[0;33m to commit and push to your fork's gh-pages branch\033[0m\n"

docs-publish:
	gh-pages -x -a -d docs/out -m "auto-generated commit"
	echo "\033[0;36m\n docs published to your fork's gh-pages branch\033[0m\n"

build-package.jsons:
	babel-node scripts/createPackageJsons

commit:
	echo "\033[0;36menter commit msg following the angular convention ( \033[4;36mhttps://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit \033[0;36m)"
	echo "\033[0;33mor listen to husky 🐶  ↓ commit however you want with \033[0;31m'$$ \033[0mgit commit --no-verify\033[0;31m'\033[0;33m and the maintainer(s) will squash it upon merging your PR\033[0m\n"
	commitlint -e $$GIT_PARAMS
	echo "\033[1;36mthanks! that'll do.\033[0m\n"
