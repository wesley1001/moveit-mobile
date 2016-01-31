#!/bin/bash -e

echo "Building XCode project..."
gym --project ios/MoveIt.xcodeproj --scheme MoveItProd --export_method development
echo
