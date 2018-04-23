.SILENT:
.PHONY: $(MAKECMDGOALS)

start:
	concurrently "npm run build:watch" "npm run test:watch"

test:
	npm run build:dev
	npm run test:base

cover:
	echo "\nbuilding modern package...\n"
	npm run build\:dev -- --env.cover
	echo "\nrunning tests & creating coverage report...\n"
	nyc --check-coverage -- npm run test:base
	echo "\nopen file://"$(CURDIR)"/coverage/lcov-report/index.html to view generated report in the browser\n\nor run '$$ npm run cover:open'\n"

lint:
	echo "\neslint's a linting...\n"
	eslint . --ext .js

build:
	rm -rf dist
	make build-package.jsons
	echo "\nbuilding modern & legacy packages...\n"
	webpack --mode development --env.legacy
	webpack --mode development --env.modern
	webpack --mode production --env.legacy
	webpack --mode production --env.modern
	echo "\nbuilds complete!\n"

docs:
	echo "\ngenerating docs...\n"
	jsdoc -c docs/jsdoc.conf.js -R README.md
	babel-node docs/custom/fixHashDot
	babel-node docs/custom/fixThisArg
	babel-node docs/custom/fixLogAfOptions
	echo "done!\n\nplease open file\://"$(CURDIR)"/docs/out/index.html in the browser or run '$$ npm run docs:open' for a preview\n\nif satisfied, run '$$ npm run docs:publish' to commit and push to your fork's gh-pages branch\n"

docs-publish:
	gh-pages -x -d docs/out -m "auto-generated commit"
	echo "\n docs published to your fork's gh-pages branch\n"

build-package.jsons:
	babel-node scripts/createPackageJsons
