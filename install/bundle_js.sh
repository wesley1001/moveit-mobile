#!/bin/bash -e

echo "Initiated JS bundling..."
react-native bundle --entry-file index.ios.js --assets-dest ./release --bundle-output ./release/main.jsbundle --dev false --platform ios
echo "JS Bundle ready!"
echo
