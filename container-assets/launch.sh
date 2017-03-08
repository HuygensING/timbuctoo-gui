#!/bin/sh

. /set-js-envs
find /usr/share/nginx/html/ -name 'index.js' -exec /call-envify.sh "$envify" '{}' \;

sed -i "s|%PREFIXPATH%|${PREFIXPATH:-/}|" /etc/nginx/conf.d/default.conf

echo "READY" > /usr/share/nginx/html/is-ready.txt

if [ -n $WHITE_LABEL ]; then
  cp -r /whitelabelfiles/$WHITE_LABEL/* "/usr/share/nginx/html/$SEARCH_CLIENT_FOLDER/"
  cp -r /whitelabelfiles/$WHITE_LABEL/* "/usr/share/nginx/html/$SEARCH_ALL_FOLDER/"
  cp -r /whitelabelfiles/$WHITE_LABEL/* "/usr/share/nginx/html/$EDIT_CLIENT_FOLDER/"
  cp -r /whitelabelfiles/$WHITE_LABEL/* "/usr/share/nginx/html/$DEFAULT_FRONTEND_FOLDER/"
  cp -r /whitelabelfiles/$WHITE_LABEL/* "/usr/share/nginx/html/$BROWSER_FOLDER/"
fi

echo "Launching nginx"
node /proxy.js &
exec nginx -g "daemon off;"