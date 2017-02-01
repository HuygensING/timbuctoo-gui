#!/bin/sh

/sources/timbuctoo-default-frontend/node_modules/.bin/envify "$2" > ./tmp
mv ./tmp "$2"