#!/bin/sh
set -e

if [ ! -d ./vendors ]; then
    echo "Creating vendors directory..."
    mkdir -p ./vendors
fi

echo "Installing additional dependencies..."
if [ -d ./vendors/adr-tools ]; then
    echo "ADR Tools already installed, skipping..."
    exit 0
fi

echo "Cloning ADR Tools..."
git clone --depth 1 --branch 3.0.0 https://github.com/npryce/adr-tools.git ./vendors/adr-tools

echo "done"