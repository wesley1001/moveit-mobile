#!/bin/bash -e

echo "Building XCode project..."
gym --project ios/MoveIt.xcodeproj --scheme MoveIt --export_method development
echo
