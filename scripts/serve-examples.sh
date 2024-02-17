#!/bin/sh
set -e

npm run build

mkdir -p public 
cp -r examples/* public/ 
cp -r dist/ public/dist 
node examples.server.js