#!/bin/bash
set -euo pipefail

# Only run in remote (web) environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# Install dependencies if node_modules is missing or incomplete
if [ ! -d "node_modules" ] || [ ! -d "node_modules/react" ]; then
  echo "Installing npm dependencies..."
  npm install
fi

# Install Python data-prep dependencies
pip3 install pandas openpyxl python-pptx --quiet 2>/dev/null || true

# Verify the project compiles
echo "Running build check..."
npm run build
echo "Session setup complete - project builds successfully."
