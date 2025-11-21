#!/bin/bash

# Performance testing script
# Builds, serves, runs Lighthouse, then cleans up

set -e

echo "🏗️  Building site..."
npm run build

echo "🚀 Starting server..."
gatsby serve > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to start..."
sleep 3

# Run Lighthouse
node scripts/lighthouse.mjs

# Run bundle size check
node scripts/bundle-size.mjs

# Check image optimization
node scripts/image-check.mjs

# Check for unused CSS
node scripts/unused-css.mjs

# Clean up
echo "🧹 Stopping server..."
kill $SERVER_PID 2>/dev/null || true

echo "✅ Done!"
