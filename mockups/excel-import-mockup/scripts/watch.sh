#!/bin/sh

mkdir -p build/development
mkdir build/development/js
cp -R src/static/* build/development/


node_modules/.bin/browserify \
	--require react \
	--require react-dom > build/development/js/react-libs.js

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/development/css/index.css \
	--watch \
	src/stylus/index.styl &

node_modules/.bin/watchify src/index.js \
	--debug \
	--outfile build/development/js/index.js \
	--external react \
	--external react-dom \
	--standalone ExcelImportMock \
	--transform [ babelify --presets [ es2015 react ] --plugins [ transform-es2015-destructuring transform-object-rest-spread transform-object-assign] ] \
	--verbose
