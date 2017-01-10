Timbuctoo multi collection search
=================================

This project expects:

1. a running [Timbuctoo](https://github.com/HuygensING/timbuctoo) instance  
2. a solr instance index built from that Timbuctoo index with this docker script:
```sh
docker run # TODO

```


Building and running locally
----------------------------

```sh
export NODE_ENV=development
export SERVER=http://localhost:8080 # location of running timbuctoo instance
export SOLR=http://localhost:8983/solr/indexname/select # location of solr index
npm run watch
npm start
```

You can now visit http://localhost:3000/dataset-search


Building for docker image
-------------------------
This builds the javascripts referring to timbuctoo via a local path, which is proxied by the nginx server in the docker.
The website which is built is subject to versioning under the path build/production. By pushing to github, this new version
will become part of the new docker image on docker hub.

```sh
npm run build:docker
```


Starting in docker
------------------

Build and run locally

```sh
npm run build:docker
docker build -t tagname .
docker run -p 1234:80 -e SOLR_URL=http://12.123.12.12:8983/solr/indexname/select -e TIMBUCTOO_URL=http://12.123.12.12:8080/  -t tagname 
```

You can now visit http://localhost:1234/dataset-search

Running the hosted docker image from docker hub.
------------------------------------------------

```
docker run -p 1234:80 -e SOLR_URL=http://12.123.12.12:8983/solr/indexname/select -e TIMBUCTOO_URL=http://12.123.12.12:8080/  -t huygensing/timbuctoo-multi-collection-search 
```

You can now visit http://localhost:1234/dataset-search
