set -e

MAIN_DIR=$(mktemp -d)
PR_DIR=$(mktemp -d)

REPORTS_DIR="test-results/backward-compatibility/reports"

# 1. Generate report for 'main'
git checkout main
npx tsc && npx api-extractor run --local
cp test-results/backward-compatibility/reports/sparkengineweb.api.md "$MAIN_DIR/main.api.md"

# 2. Generate report for PR branch
git checkout -
npx tsc && npx api-extractor run --local
cp test-results/backward-compatibility/reports/sparkengineweb.api.md "$PR_DIR/pr.api.md"

# 3. Create diff report file
diff -u "$MAIN_DIR/main.api.md" "$PR_DIR/pr.api.md" > "$REPORTS_DIR/api-diff-report.md" || true

rm -rf "$MAIN_DIR" "$PR_DIR"