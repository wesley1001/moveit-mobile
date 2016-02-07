# MoveIt
React Native iOS app for MoveIt.

## Dev Setup
1.Clone the repo and install node packages:
``` bash
git clone git@github.com:multunus/moveit-ios.git
cd moveit-ios
npm install
```
2.Change the app server url to a local server in `appConfig.js` if required

## Create and use a local JS bundle
1.Run script to bundle the JS code to a local file
``` bash
.install/bundle_js.sh
```

2.Comment the `if else` block `AppDelegate.m` which sets the `jsCodeLocation`

3.Uncomment this line in `AppDelegate.m` -
```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

## Generate the production ipa file
1.Create an `env.json` file similar to the `env.json.example` and set the appropriate values.

2.Run the gulp task
``` bash
gulp ios:build
```

This generates `MoveIt.ipa` in the same directory.

Follow the above instructions if you wish to use the command line to generate the production ipa. For all dev and testing purposes use XCode.
