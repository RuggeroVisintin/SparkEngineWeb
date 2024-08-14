#!/bin/sh
set -e

if [ ! -d ./dist/ ]; then
    npm run build
fi

npx typedoc src/index.ts 
cp -r assets/* docs/tsdoc/assets 
mkdir -p docs/tsdoc/examples 
cp -r examples/* docs/tsdoc/examples
cp -r dist/ docs/tsdoc/dist