# MoveIt
React Native iOS app for MoveIt.

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

2.Comment the `if else` block `AppDelegate.m` which sets the `jsCodeLocation`

3.Uncomment this line in `AppDelegate.m` -
```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

## Installing production app on device from the command line
1.Install [gym](https://github.com/fastlane/gym#installation)

2.Install [ios-deploy](https://github.com/phonegap/ios-deploy#installation)

3.Set the environment variable CODE_PUSH_PROD_KEY (and maybe add it to your .bashrc)
``` bash
export CODE_PUSH_PROD_KEY=your_key_here
```

4.Set the app URL in `constants.js`

5.Follow appropriate instructions from previous sections for setting up the JS code

6.Connect an iOS device and run the install script -
```
./install.sh
```

Use the above script only if you wish to use the command line to install the production app. For all dev and testing purposes use XCode.
