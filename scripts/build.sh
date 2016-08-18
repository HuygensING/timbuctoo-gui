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

mkdir -p "build/${NODE_ENV}/js"
mkdir -p "build/${NODE_ENV}/css"

cp -R src/index.html "build/${NODE_ENV}/index.html"

node_modules/.bin/browserify \
	--transform [ envify --NODE_ENV="${NODE_ENV}" ] \
	--require classnames \
	--require immutable \
	--require react \
	--require react-dom > "build/${NODE_ENV}/js/react-libs.js"

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out "build/${NODE_ENV}/css/index.css" \
	$styluswatch \
	src/stylus/index.styl &

node_modules/.bin/$cmd src/index.js \
	--transform [ envify --NODE_ENV="${NODE_ENV}" --USE_MOCK="${USE_MOCK}" --server="$server" ] \
	--outfile "build/${NODE_ENV}/js/index.js" \
	--external classnames \
	--external react \
	--external react-dom \
	--standalone TimbuctooEdit \
	--transform [ babelify ] \
	--verbose
