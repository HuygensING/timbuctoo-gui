#!/bin/sh

NODE_ENV=${NODE_ENV:-development}

mkdir -p build/${NODE_ENV}
mkdir build/${NODE_ENV}/js
cp -R src/static/* build/${NODE_ENV}/


node_modules/.bin/browserify \
	--transform [ envify --NODE_ENV=$NODE_ENV ] \
	--require react \
	--require react-dom > build/${NODE_ENV}/js/react-libs.js

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out build/${NODE_ENV}/css/index.css \
	--watch \
	src/stylus/index.styl &

node_modules/.bin/watchify src/index.js \
	--debug \
	--outfile build/${NODE_ENV}/js/index.js \
	--external react \
	--external react-dom \
	--standalone ExcelImportMock \
	--transform [ babelify --presets [ es2015 react ] --plugins [ transform-es2015-destructuring transform-object-rest-spread transform-object-assign] ] \
	--transform [ envify --NODE_ENV=$NODE_ENV ] \
	--verbose
