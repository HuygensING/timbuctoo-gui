#!/bin/sh
if [ -z "$OWN_HOST_URL" ]; then
  echo 'You should set $OWN_HOST_URL (run docker with something like --env="OWN_HOST_URL=http://localhost:8082")'
  exit 1
fi

sed -i "s|%PREFIXPATH%|${PREFIXPATH:-/}|" /etc/nginx/conf.d/default.conf

#http://veithen.github.io/2014/11/16/sigterm-propagation.html
trap 'kill -TERM $nginxpid' TERM INT
nginx -g "daemon off;" &
nginxpid=$!

. /set-js-envs

/build.sh $EDIT_CLIENT_FOLDER timbuctoo-edit-client --watch &
/build.sh $DEFAULT_FRONTEND_FOLDER timbuctoo-default-frontend --watch &
/build.sh $SEARCH_CLIENT_FOLDER timbuctoo-generic-search-client --watch &
/build.sh $SEARCH_ALL_FOLDER timbuctoo-multi-collection-search --watch &
/build.sh $BROWSER_FOLDER timbuctoo-browser-app --watch &

echo "READY" > /usr/share/nginx/html/is-ready.txt

wait $nginxpid