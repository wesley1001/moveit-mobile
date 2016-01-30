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

## Create and use a local JS bundle
1.Run script to bundle the JS code to a local file
``` bash
.install/bundle_js.sh
```
2.Comment this line in `AppDelegate.m` -
```
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
```
3.Uncomment this line in `AppDelegate.m` -
```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

## Use CodePush
1.Set the environment variable CODE_PUSH_PROD_KEY (and add it to your .bashrc)
``` bash
export CODE_PUSH_PROD_KEY=your_key_here
```
2.Comment these lines in `AppDelegate.m` -
```
jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
```
```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```
3.Uncomment this line in `AppDelegate.m` -
```
jsCodeLocation = [CodePush bundleURL];
```
4.Update `Info.plist` with the CodePush key
``` bash
./set_code_push_key.sh
```
Note: Remember to not add the above changes to `Info.plist` while checking in the code.
