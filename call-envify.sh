#!/bin/sh

/sources/node_modules/.bin/envify "$2" > ./tmp
mv ./tmp "$2"