FROM huygensing/timbuctoo-gui:buildbase

WORKDIR /sources
ENV NODE_ENV=production
ENV BUILD_TARGET=production

ENV TIMBUCTOO_URL='http://TIMBUCTOO_URL'
ENV SOLR_QUERY_URL='http://SOLR_URL'
ENV INDEXER_URL='http://INDEXER_URL'
ENV OWN_HOST_URL='http://localhost:8080'

ENV DEFAULT_FRONTEND_FOLDER='upload'
ENV EDIT_CLIENT_FOLDER='edit-gui'
ENV SEARCH_CLIENT_FOLDER='search'
ENV SEARCH_ALL_FOLDER='searchAll'

COPY timbuctoo-default-frontend /sources/timbuctoo-default-frontend
WORKDIR /sources/timbuctoo-default-frontend
RUN npm install && npm install --only=dev
RUN ./scripts/build.sh
RUN mkdir -p /usr/share/nginx/html/$DEFAULT_FRONTEND_FOLDER && cp -r build/production/* /usr/share/nginx/html/$DEFAULT_FRONTEND_FOLDER

COPY timbuctoo-edit-client /sources/timbuctoo-edit-client
WORKDIR /sources/timbuctoo-edit-client
RUN npm install && npm install --only=dev
RUN npm run timbuild
RUN mkdir -p /usr/share/nginx/html/$EDIT_CLIENT_FOLDER && cp -r build/production/* /usr/share/nginx/html/$EDIT_CLIENT_FOLDER

COPY timbuctoo-generic-search-client /sources/timbuctoo-generic-search-client
WORKDIR /sources/timbuctoo-generic-search-client
RUN npm install && npm install --only=dev
RUN ./scripts/build.sh
RUN mkdir -p /usr/share/nginx/html/$SEARCH_CLIENT_FOLDER && cp -r build/production/* /usr/share/nginx/html/$SEARCH_CLIENT_FOLDER

COPY timbuctoo-multi-collection-search /sources/timbuctoo-multi-collection-search
WORKDIR /sources/timbuctoo-multi-collection-search
RUN npm install && npm install --only=dev
RUN npm run build:docker
RUN mkdir -p /usr/share/nginx/html/$SEARCH_ALL_FOLDER && cp -r build/production/* /usr/share/nginx/html/$SEARCH_ALL_FOLDER

COPY launch.sh /launch.sh
COPY call-envify.sh /call-envify.sh
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

CMD ["/launch.sh"]