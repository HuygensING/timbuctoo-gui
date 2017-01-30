#!/bin/sh
export TIMBUCTOO_SEARCH_GUI_URL="$OWN_HOST_URL/$SEARCH_CLIENT_FOLDER"
export TIMBUCTOO_SEARCH_ALL_GUI_URL="$OWN_HOST_URL/$SEARCH_ALL_FOLDER"
export TIMBUCTOO_EDIT_GUI_URL="$OWN_HOST_URL/$EDIT_CLIENT_FOLDER"
export TIMBUCTOO_GUI_URL="$OWN_HOST_URL/$DEFAULT_FRONTEND_FOLDER"

envify=$(find /sources -name envify | grep .bin |head -n1)

find /usr/share/nginx/html/ -name 'index.js' -exec /call-envify.sh "$envify" '{}' \;

echo "Launching nginx"
exec nginx -g "daemon off;"