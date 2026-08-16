#!/bin/sh
set -e

# 1. Setup temporary directories and capture starting reference safely
MAIN_TEMP_DIR=$(mktemp -d)
PR_TEMP_DIR=$(mktemp -d)
REPORTS_DIR="test-results/backward-compatibility/reports"

# Save the exact commit or branch we started on before doing any folder swaps
START_REF=$(git rev-parse HEAD)

echo "Generating report for PR branch..."
mkdir -p "$REPORTS_DIR"
npm run build:lib && npx api-extractor run --local
cp "$REPORTS_DIR/sparkengineweb.api.md" "$PR_TEMP_DIR/pr.api.md"

echo "Fetching 'main' source files..."
git fetch origin main
git branch -f temp-main-branch origin/main
mkdir -p "$MAIN_TEMP_DIR/main-src"
git archive temp-main-branch src | tar -x -C "$MAIN_TEMP_DIR/main-src"

echo "Generating report for 'main' code..."
rm -rf src
mv "$MAIN_TEMP_DIR/main-src/src" src

mkdir -p "$REPORTS_DIR"
npm run build:lib && npx api-extractor run --local
cp "$REPORTS_DIR/sparkengineweb.api.md" "$MAIN_TEMP_DIR/main.api.md"

echo "Restoring PR source code..."
rm -rf src
git checkout "$START_REF" -- src/

echo "Comparing reports and generating api-diff-report.md..."
diff -u "$MAIN_TEMP_DIR/main.api.md" "$PR_TEMP_DIR/pr.api.md" > "${REPORTS_DIR}/api-diff-report.md" || true

# Clean up temp directories and temporary branch
rm -rf "$MAIN_TEMP_DIR" "$PR_TEMP_DIR"
git branch -D temp-main-branch &>/dev/null || true

echo "Done! Breaking changes diff saved to api-diff-report.md"