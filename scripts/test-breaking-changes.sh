#!/bin/sh
set -e

# 1. Setup temporary directories and preserve current branch/state
MAIN_TEMP_DIR=$(mktemp -d)
PR_TEMP_DIR=$(mktemp -d)
CURRENT_BRANCH=$(git branch --show-current)
REPORTS_DIR="test-results/backward-compatibility/reports"

# Fallback if running detached in CI (like GitHub Actions)
if [ -z "$CURRENT_BRANCH" ]; then
  CURRENT_BRANCH="${GITHUB_HEAD_REF:-$(git rev-parse HEAD)}"
fi

echo "Generating report for PR branch..."
mkdir -p "$REPORTS_DIR"
npm run build:lib && npx api-extractor run --local
cp "$REPORTS_DIR/sparkengineweb.api.md" "$PR_TEMP_DIR/pr.api.md"

echo "Fetching 'main' source files..."
git fetch origin main:temp-main-branch
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
git checkout "$CURRENT_BRANCH" -- src/

echo "Comparing reports and generating api-diff-report.md..."
diff -u "$MAIN_TEMP_DIR/main.api.md" "$PR_TEMP_DIR/pr.api.md" > "${REPORTS_DIR}/api-diff-report.md" || true

# Clean up temp directories and temporary branch
rm -rf "$MAIN_TEMP_DIR" "$PR_TEMP_DIR"
git branch -D temp-main-branch &>/dev/null || true

echo "Done! Breaking changes diff saved to api-diff-report.md"