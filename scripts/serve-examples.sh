#!/bin/sh

set -e

mkdir -p public 
cp -r examples/ public/examples 
cp -r dist/ public/dist 
mv public/examples/index.html public/index.html
node examples.server.js