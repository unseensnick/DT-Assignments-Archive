#!/bin/bash

# Get the commit message of the latest commit
commit_message=$(git log -1 --pretty=%B)

# Check if the commit message contains the word "build"
if [[ "$commit_message" == *"build"* ]]; then
  echo "Commit message contains 'build'. Proceeding with the build..."
  exit 0 # Continue with the build process
else
  echo "No 'build' in the commit message. Skipping the build..."
  exit 1 # Skip the build process
fi
