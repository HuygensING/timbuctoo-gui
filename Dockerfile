FROM huygensing/timbuctoo-gui:buildbase

EXPOSE 80
WORKDIR /sources
ENV NODE_ENV=production
ENV BUILD_TARGET=production

ENV TIMBUCTOO_URL='http://TIMBUCTOO_URL'
ENV SOLR_QUERY_URL='http://SOLR_URL'
ENV INDEXER_URL='http://INDEXER_URL'
ENV OWN_HOST_URL='http://localhost:8080'

ENV DEFAULT_FRONTEND_FOLDER='overview'
ENV EDIT_CLIENT_FOLDER='edit-gui'
ENV SEARCH_CLIENT_FOLDER='search'
ENV SEARCH_ALL_FOLDER='searchAll'

COPY container-assets/build.sh /build.sh

COPY timbuctoo-default-frontend /sources/timbuctoo-default-frontend
WORKDIR /sources/timbuctoo-default-frontend
RUN /build.sh $DEFAULT_FRONTEND_FOLDER timbuctoo-default-frontend

COPY timbuctoo-edit-client /sources/timbuctoo-edit-client
WORKDIR /sources/timbuctoo-edit-client
RUN /build.sh $EDIT_CLIENT_FOLDER timbuctoo-edit-client

COPY timbuctoo-generic-search-client /sources/timbuctoo-generic-search-client
WORKDIR /sources/timbuctoo-generic-search-client
RUN /build.sh $SEARCH_CLIENT_FOLDER timbuctoo-generic-search-client

COPY timbuctoo-multi-collection-search /sources/timbuctoo-multi-collection-search
WORKDIR /sources/timbuctoo-multi-collection-search
RUN /build.sh $SEARCH_ALL_FOLDER timbuctoo-multi-collection-search

COPY container-assets/set-js-envs /set-js-envs
COPY container-assets/launch.sh /launch.sh
COPY container-assets/develop.sh /develop.sh
COPY container-assets/call-envify.sh /call-envify.sh
COPY container-assets/nginx.conf /etc/nginx/nginx.conf
COPY container-assets/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY container-assets/index.html /usr/share/nginx/html/index.html

CMD ["/launch.sh"]