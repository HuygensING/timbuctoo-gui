#!/bin/sh
NODE_ENV="${NODE_ENV:-development}"
SERVER="${SERVER:-http://localhost:8080}"
echo "NODE_ENV=$NODE_ENV"

curdir=`pwd`
while [ -n "$curdir" -a "$curdir" != '/' ]; do
	PATH="$curdir/node_modules/.bin:$PATH"
	curdir=`dirname "$curdir"`
done

if [ "$1" = "--watch" ]; then
	cmd="watchify"
else
	cmd="browserify"
fi


mkdir -p "build/${NODE_ENV}/js"
cp -R src/static/* "build/${NODE_ENV}/"

browserify \
	--transform [ envify --NODE_ENV="${NODE_ENV}" ] \
	--require react \
	--require react-dom > "build/${NODE_ENV}/js/react-libs.js"


$cmd src/index.js \
	--debug \
	--outfile "build/${NODE_ENV}/js/index.js" \
	--external react \
	--external react-dom \
	--standalone TimSearch \
	--transform [ babelify --presets [ es2015 react ] --plugins [ transform-es2015-destructuring transform-object-rest-spread transform-object-assign] ] \
	--verbose
