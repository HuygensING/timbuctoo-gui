#!/bin/sh

. /set-js-envs
find /usr/share/nginx/html/ -name 'index.js' -exec /call-envify.sh "$envify" '{}' \;

sed -i "s|%PREFIXPATH%|${PREFIXPATH:-/}|" /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

echo "READY" > /usr/share/nginx/html/is-ready.txt

echo "Launching nginx"
exec nginx -g "daemon off;"