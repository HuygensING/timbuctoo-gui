#!/bin/sh

mkdir -p build/development/js
mkdir -p build/development/css

cp src/query.html build/development/index.html

node_modules/.bin/browserify \
	--require classnames \
	--require react \
	--require react-dnd \
	--require react-dnd-touch-backend \
	--require react-dom > build/development/js/react-libs.js

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/development/css/index.css \
	--watch \
	src/stylus/query.styl &

node_modules/.bin/watchify src/query-index.js \
	--outfile build/development/js/index.js \
	--external classnames \
	--external react \
	--external react-dom \
	--standalone TimbuctooEdit \
	--transform [ babelify ] \
	--verbose
