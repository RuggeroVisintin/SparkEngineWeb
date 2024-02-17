#!/bin/sh

set -e

mkdir -p public 
cp -r examples/* public/ 
cp -r dist/ public/dist 
node examples.server.js