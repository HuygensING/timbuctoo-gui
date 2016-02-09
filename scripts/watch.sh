#!/bin/sh

mkdir -p build/development/js

cp src/index.html build/development/index.html

node_modules/.bin/browserify \
	--require classnames \
	--require immutable \
	--require react \
	--require react-dom > build/development/js/react-libs.js

node_modules/.bin/watchify src/index.js \
	--outfile build/development/js/index.js \
	--external classnames \
	--external react \
	--external react-dom \
	--standalone TimbuctooEdit \
	--transform [ babelify ] \
	--verbose
