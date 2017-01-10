FROM nginx:1.11.8

RUN mkdir -p /usr/share/nginx/html/dataset-search
COPY build/production/. /usr/share/nginx/html/dataset-search

EXPOSE 80

CMD echo "server { \
            listen       80; \
            server_name  localhost; \
            location / { \
              root   /usr/share/nginx/html; \
              index  index.html index.htm; \
            } \
            location /repositorysolr/aggregated { \
              proxy_pass $SOLR_URL; \
              proxy_redirect default; \
            } \
            location /timbuctoo/ { \
              proxy_pass $TIMBUCTOO_URL; \
              proxy_redirect default; \
            } \
          }" > /etc/nginx/conf.d/default.conf; cat /etc/nginx/conf.d/default.conf; nginx -g 'daemon off;'
