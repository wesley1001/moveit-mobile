# MoveIt
React Native iOS app for MoveIt. This repository is currently usable only for development.

## Dev Setup
1.Clone the repo and install node packages:
``` bash
git clone git@github.com:multunus/moveit-ios.git
cd moveit-ios
npm install
```
2.Change the app server url to a local server in `constants.js` if required

## Package the app
1.Run script to bundle the JS code to a local file
``` bash
./bundle_js.sh
```
2.Comment this line in `AppDelegate.m` -
```
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
```
3.Uncomment this line in `AppDelegate.m` -
```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```
4.Now run the app from XCode on a connected device / simulator
