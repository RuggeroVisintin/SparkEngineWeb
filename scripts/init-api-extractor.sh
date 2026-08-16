#!/bin/sh
set -e

echo "Checking if API Extractor is initialized..."


# check if the api-extractor.json file exists in the current directory
if [ ! -f ./api-extractor.json ]; then
    echo "Initializing API Extractor..."
    npx api-extractor init
    echo "API Extractor initialized successfully."
else
    echo "Skipping: API Extractor is already initialized."
fi
