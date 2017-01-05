Timbuctoo edit environment
===

This is the edit GUI for [Timbuctoo](https://github.com/HuygensING/timbuctoo) and is served out through the Timbuctoo [static assets](https://github.com/HuygensING/timbuctoo/tree/master/timbuctoo-instancev4/src/main/resources/static/edit-gui).

It exposes a GUI for browsing timbuctoo data records and editing them through form fields.

## Building and running for local development

```sh
 export NODE_ENV=development
 export server=http://localhost:8080 # the timbuctoo instance
 npm run watch
 npm start
```

## Building a new deployment for Timbuctoo

```sh
 export NODE_ENV=production
 npm run timbuild
 cp -r build/production/* /path/to/timbuctoo/timbuctoo-instancev4/src/main/resources/static/upload
 cd /path/to/timbuctoo
 mvn clean package # rebuilding is necessary to deploy new statics
```
