# MoveIt
React Native iOS app for MoveIt. This repository is currently usable only for development.

## Dev Setup
- Clone the repo and install node packages:
``` bash
git clone git@github.com:multunus/moveit-ios.git
cd moveit-ios
npm install
```
- Change the app server url to a local server in `constants.js` if required

## Package the app
- Bundle the JS code to a local file
``` bash
react-native bundle --entry-file index.ios.js --bundle-output main.jsbundle
```
- Comment this line in `AppDelegate.m` -
```
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
```
- Now run the app from XCode on a connected device / simulator
