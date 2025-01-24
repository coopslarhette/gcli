#!/bin/bash
# release.sh

# Get current version
current_version=$(gh release view --json tagName --jq .tagName)

# Remove any 'v' prefix if it exists
current_version=${current_version#v}

# Split the version into parts
IFS='.' read -r major minor patch <<< "$current_version"

# Increment the patch version
new_patch=$((patch + 1))

# Construct new version
new_version="v$major.$minor.$new_patch"

echo "$new_version"

# Build binaries
npm run build
pkg . --targets node18-macos-arm64 --output gcli-arm64
pkg . --targets node18-macos-x64 --output gcli-x64

# Create tarballs
tar -czf gcli-arm64.tar.gz gcli-arm64
tar -czf gcli-x64.tar.gz gcli-x64

# Create GitHub release
gh release create "$new_version" \
 --title "$new_version" \
 --notes "Latest updates" \
 gcli-arm64.tar.gz \
 gcli-x64.tar.gz

# Print SHA256 for formula update
echo "SHA256 hashes for formula:"
shasum -a 256 gcli-*.tar.gz
