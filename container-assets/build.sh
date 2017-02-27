#!/bin/sh

cd /sources/$2

export NODE_PATH="/sources/"

#add node_modules installed commands to path
curdir=`pwd`
while [ -n "$curdir" -a "$curdir" != '/' ]; do
	PATH="$curdir/node_modules/.bin:$PATH"
	curdir=`dirname "$curdir"`
done

if [ "$3" = "--watch" ]; then
  export NODE_ENV="development"
	cmd="watchify"
	styluswatch="--watch"
  envify="--transform [ envify ]"
else
  export NODE_ENV="production"
	cmd="browserify"
	styluswatch=""
  envify=""
fi

mkdir -p "/usr/share/nginx/html/$1/js"
cp -R src/static/* "/usr/share/nginx/html/$1/"

browserify \
	--transform [ envify ] \
	--outfile "/usr/share/nginx/html/$1/js/react-libs.js" \
	--require classnames \
	--require react \
	--require react-dom \
	--require react-redux \
	--require react-router \
	--require redux \
	--require redux-thunk \
  --require xhr

[ -f src/stylus/index.styl ] && stylus \
	--use nib \
	--compress \
	--out "/usr/share/nginx/html/$1/css/index.css" \
	$styluswatch \
	src/stylus/index.styl &

$cmd src/index.js \
	--debug \
	--outfile "/usr/share/nginx/html/$1/js/index.js" \
	--external classnames \
	--external react \
	--external react-dom \
	--external react-redux \
	--external react-router \
	--external redux \
	--external redux-thunk \
	--external xhr \
	--transform [ babelify --presets [ es2015 react ] --plugins [ transform-es2015-destructuring transform-object-rest-spread transform-object-assign] ] \
	$envify \
  --verbose

