#!/bin/sh
set -e

if [ ! -d ./dist/lib ]; then
    mkdir -p ./dist/lib
fi

npx tsc

find src -type f -name "*.js" -exec rsync -R {} ./dist/lib \;
find src -type f -name "*.d.ts" -exec rsync -R {} ./dist/lib \;

jq 'del(.scripts) | del(.devDependencies) | .main |= "src/index.js"' package.json > ./dist/lib/package.json

echo "cleaning up..."

npm run clean