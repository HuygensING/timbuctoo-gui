# timbuctoo-default-frontend

This is the default frontend for [Timbuctoo](https://github.com/HuygensING/timbuctoo) and is served out through the Timbuctoo [static assets](https://github.com/HuygensING/timbuctoo/tree/master/timbuctoo-instancev4/src/main/resources/static/upload).
It exposes a GUI for uploading excel files and mapping them to the Timbuctoo data model.

## Building and running for local development

Using a local timbuctoo instance.
```sh
 export NODE_ENV=development
 export server=http://localhost:8080 # the timbuctoo instance
 npm run watch
 npm start
```

Build using a client side mock server (without browser-sync support)
```sh
 export NODE_ENV=development
 npm run watch:mock
```

## Building a new deployment for Timbuctoo

```sh
 export NODE_ENV=production
 npm run timbuild
 cp -r build/production/* /path/to/timbuctoo/timbuctoo-instancev4/src/main/resources/static/upload
 cd /path/to/timbuctoo
 mvn clean package # rebuilding is necessary to deploy new statics
```
