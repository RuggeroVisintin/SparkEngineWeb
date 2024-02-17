#!/bin/sh

set -e

npx typedoc src/index.ts 
cp -r assets/* docs/assets 
mkdir -p docs/examples 
cp -r examples/* docs/examples
cp -r dist/ docs/dist