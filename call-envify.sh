#!/bin/sh

"$1" "$2" > ./tmp
mv ./tmp "$2"