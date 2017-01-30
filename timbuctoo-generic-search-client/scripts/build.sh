#!/bin/sh
NODE_ENV="${NODE_ENV:-development}"

echo "NODE_ENV=$NODE_ENV"
if [ "$1" = "--watch" ]; then
	cmd="watchify"
	styluswatch="--watch"
else
	cmd="browserify"
	styluswatch=""
fi

curdir=`pwd`
while [ -n "$curdir" -a "$curdir" != '/' ]; do
	PATH="$curdir/node_modules/.bin:$PATH"
	curdir=`dirname "$curdir"`
done

mkdir -p "build/${NODE_ENV}/js"
mkdir -p "build/${NODE_ENV}/css"
mkdir -p "build/${NODE_ENV}/fonts"
mkdir -p "build/${NODE_ENV}/images"

cp -R src/index.html "build/${NODE_ENV}/index.html"
cp src/static/css/* "build/${NODE_ENV}/css"
cp src/static/fonts/* "build/${NODE_ENV}/fonts"
cp src/static/images/* "build/${NODE_ENV}/images"

browserify \
	--transform [ envify --NODE_ENV="${NODE_ENV}" ] \
	--require classnames
	--require react \
	--require react-dom \
	--require react-router \
	--require react-redux \
	--require redux-thunk \
	--require xhr > "build/${NODE_ENV}/js/react-libs.js"

browserify src/index.js \
	--outfile "build/${NODE_ENV}/js/index.js" \
	--external classnames \
	--external react \
	--external react-dom \
	--external react-redux \
	--external react-router \
	--external redux \
	--external redux-thunk \
	--external xhr \
	--standalone TimbuctooSearch \
	--transform [ babelify ] \
	--transform [ envify --NODE_ENV="${NODE_ENV}" --server="${SERVER}" ] \
	--verbose
