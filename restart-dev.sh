#!/bin/bash

echo "🧹 Cleaning cache..."
rm -rf node_modules/.vite dist .vite

echo "🛑 Stopping any running dev servers..."
pkill -f "vite" || true

echo "✨ Starting fresh dev server on port 3000..."
npm run dev
