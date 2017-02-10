#!/bin/sh
export TIMBUCTOO_SEARCH_GUI_URL="$OWN_HOST_URL/$SEARCH_CLIENT_FOLDER/"
export TIMBUCTOO_SEARCH_ALL_GUI_URL="$OWN_HOST_URL/$SEARCH_ALL_FOLDER/"
export TIMBUCTOO_EDIT_GUI_URL="$OWN_HOST_URL/$EDIT_CLIENT_FOLDER"
export TIMBUCTOO_GUI_URL="$OWN_HOST_URL/$DEFAULT_FRONTEND_FOLDER"

find /usr/share/nginx/html/ -name 'index.js' -exec /call-envify.sh "$envify" '{}' \;

sed -i "s|%PREFIXPATH%|${PREFIXPATH:-/}|" /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

echo "READY" > /usr/share/nginx/html/is-ready.txt

echo "Launching nginx"
exec nginx -g "daemon off;"