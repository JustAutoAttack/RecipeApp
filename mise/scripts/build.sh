#!/bin/bash

set -e

echo "Starting build process..."

echo "Installing dependencies..."
npm install

echo "Building frontend..."
npm run build

echo "Running Tauri build (This may take a moment)..."

npm run tauri build

echo "Build complete!"
echo "Artifacts located in: src-tauri/target/release/bundle/"

ls -lh src-tauri/target/release/bundle/appimage/
ls -lh src-tauri/target/release/bundle/rpm/