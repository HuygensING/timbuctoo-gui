FROM huygensing/timbuctoo-gui:buildbase

COPY timbuctoo-default-frontend /sources/timbuctoo-default-frontend
WORKDIR /sources/timbuctoo-default-frontend
RUN /build.sh $DEFAULT_FRONTEND_FOLDER timbuctoo-default-frontend

COPY timbuctoo-edit-client /sources/timbuctoo-edit-client
WORKDIR /sources/timbuctoo-edit-client
RUN /build.sh $EDIT_CLIENT_FOLDER timbuctoo-edit-client

COPY solr-faceted-search-react /sources/solr-faceted-search-react
WORKDIR /sources/solr-faceted-search-react

COPY timbuctoo-generic-search-client /sources/timbuctoo-generic-search-client
WORKDIR /sources/timbuctoo-generic-search-client
RUN /build.sh $SEARCH_CLIENT_FOLDER timbuctoo-generic-search-client

COPY timbuctoo-multi-collection-search /sources/timbuctoo-multi-collection-search
WORKDIR /sources/timbuctoo-multi-collection-search
RUN /build.sh $SEARCH_ALL_FOLDER timbuctoo-multi-collection-search

COPY timbuctoo-browser-app /sources/timbuctoo-browser-app
WORKDIR /sources/timbuctoo-browser-app
RUN /build.sh $BROWSER_FOLDER timbuctoo-browser-app

COPY container-assets/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY container-assets/call-envify.sh /call-envify.sh
COPY container-assets/launch.sh /launch.sh
COPY container-assets/set-js-envs /set-js-envs

CMD ["/launch.sh"]