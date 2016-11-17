#!/bin/sh
NODE_ENV="${NODE_ENV:-development}"
SOLR_URL="${SOLR_URL:-http://localhost:8983/solr}"

echo "NODE_ENV=$NODE_ENV"

if [ "$1" = "--watch" ]; then
	cmd="watchify"
else
	cmd="browserify"
fi


mkdir -p "build/${NODE_ENV}/js"
cp -R src/static/* "build/${NODE_ENV}/"


node_modules/.bin/browserify \
	--transform [ envify --NODE_ENV="${NODE_ENV}" ] \
	--require react \
	--require react-dom > "build/${NODE_ENV}/js/react-libs.js"


node_modules/.bin/$cmd src/index.js \
	--debug \
	--outfile "build/${NODE_ENV}/js/index.js" \
	--external react \
	--external react-dom \
	--standalone TimSearch \
	--transform [ babelify --presets [ es2015 react ] --plugins [ transform-es2015-destructuring transform-object-rest-spread transform-object-assign] ] \
	--transform [ envify --NODE_ENV="${NODE_ENV}" --SOLR_URL="${SOLR_URL}" ] \
	--verbose
