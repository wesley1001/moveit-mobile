#!/bin/bash -e

if [ -z $CODE_PUSH_PROD_KEY ]
then
  echo "Error! CODE_PUSH_PROD_KEY not set!"
  exit 1
fi
# PENDING - Set app server url in constants.js
./install/bundle_js.sh
echo "Preparing Info.plist for CodePush..."
echo
/usr/libexec/PlistBuddy -c "Set JSScheme codepush" ios/MoveIt/Info.plist
/usr/libexec/PlistBuddy -c "Set CodePushDeploymentKey ${CODE_PUSH_PROD_KEY}" ios/MoveIt/Info.plist
./install/build_xcode_project.sh
./install/install_on_device.sh
echo
echo "Restting Info.plist..."
/usr/libexec/PlistBuddy -c "Set JSScheme" ios/MoveIt/Info.plist
/usr/libexec/PlistBuddy -c "Set CodePushDeploymentKey" ios/MoveIt/Info.plist
echo "Done!!"
