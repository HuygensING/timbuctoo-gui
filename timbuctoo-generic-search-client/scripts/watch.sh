#!/bin/sh


node_modules/.bin/browserify \
	--require react \
	--require react-dom \
	--require react-router \
	--require react-redux \
	--require classnames > ${BUILD_TARGET}/react-libs.js

node_modules/.bin/watchify src/index.js \
	--outfile ${BUILD_TARGET}/index.js \
	--external react \
	--external react-dom \
	--external classnames \
	--external react-router \
	--external react-redux \
	--standalone TimbuctooSearch \
	--transform [ babelify ] \
	--transform [ envify --NODE_ENV="${NODE_ENV}" --server="${SERVER}" ] \
	--verbose
