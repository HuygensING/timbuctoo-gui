#!/bin/sh
NODE_ENV="${NODE_ENV:-development}"
if [ "${NODE_ENV}" = "development" ]; then
	USE_MOCK="${USE_MOCK:-true}"
else
	USE_MOCK="${USE_MOCK:-false}"
fi

echo "NODE_ENV=$NODE_ENV"
if [ "$USE_MOCK" = "true" ]; then
	echo "USE_MOCK is enabled"
	server="http://test.repository.huygens.knaw.nl"
else
	echo "USE_MOCK is disabled"
	echo "server=$server"
fi


if [ "$1" = "--watch" ]; then
	cmd="watchify"
	styluswatch="--watch"
else
	cmd="browserify"
	styluswatch=""
fi


mkdir -p "build/${NODE_ENV}/js"
cp -R src/static/* "build/${NODE_ENV}/"


node_modules/.bin/browserify \
	--transform [ envify --NODE_ENV="${NODE_ENV}" ] \
	--require react \
	--require react-dom > "build/${NODE_ENV}/js/react-libs.js"

./node_modules/.bin/stylus \
	--use nib \
	--compress \
	--out "build/${NODE_ENV}/css/index.css" \
	$styluswatch \
	src/stylus/index.styl &

node_modules/.bin/$cmd src/index.js \
	--debug \
	--outfile "build/${NODE_ENV}/js/index.js" \
	--external react \
	--external react-dom \
	--standalone ExcelImportMock \
	--transform [ babelify --presets [ es2015 react ] --plugins [ transform-es2015-destructuring transform-object-rest-spread transform-object-assign] ] \
	--transform [ envify --NODE_ENV="${NODE_ENV}" --USE_MOCK="${USE_MOCK}" --server="$server" ] \
	--verbose
