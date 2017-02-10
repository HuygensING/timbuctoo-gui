#!/bin/sh
if [ -z "$OWN_HOST_URL" ]; then
  echo 'You should set $OWN_HOST_URL (run docker with something like --env="OWN_HOST_URL=http://localhost:8082")'
  exit 1
fi

sed -i "s|%PREFIXPATH%|${PREFIXPATH:-/}|" /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

nginx -g "daemon off;" &
nginxpid=$!

export TIMBUCTOO_SEARCH_GUI_URL="$OWN_HOST_URL/$SEARCH_CLIENT_FOLDER/"
export TIMBUCTOO_SEARCH_ALL_GUI_URL="$OWN_HOST_URL/$SEARCH_ALL_FOLDER"
export TIMBUCTOO_EDIT_GUI_URL="$OWN_HOST_URL/$EDIT_CLIENT_FOLDER"
export TIMBUCTOO_GUI_URL="$OWN_HOST_URL/$DEFAULT_FRONTEND_FOLDER"

echo "environment: "
env | sort

/build.sh $EDIT_CLIENT_FOLDER timbuctoo-edit-client --watch &
/build.sh $DEFAULT_FRONTEND_FOLDER timbuctoo-default-frontend --watch &
/build.sh $SEARCH_CLIENT_FOLDER timbuctoo-generic-search-client --watch &
/build.sh $SEARCH_ALL_FOLDER timbuctoo-multi-collection-search --watch &

wait $nginxpid