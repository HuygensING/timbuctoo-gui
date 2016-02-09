#!/bin/sh

mkdir -p build/development/js

cp src/index.html build/development/index.html

node_modules/.bin/watchify src/index.js \
	--outfile build/development/js/index.js \
	--standalone TimbuctooEdit \
	--transform [ babelify ] \
	--verbose
