# MoveIt React Native Apps

[![wercker status](https://app.wercker.com/status/cc2ce2f936b575a6a7f96e72085b4e06/m "wercker status")](https://app.wercker.com/project/bykey/cc2ce2f936b575a6a7f96e72085b4e06)

For more details of our MoveIt app, [head here](https://github.com/multunus/moveit-rails).

# Android app

## Usage
Follow the instructions here to [setup Android environment](https://facebook.github.io/react-native/docs/android-setup.html).
Clone the repo and run this from inside the directory:
```
npm install
```
That's it - you're done.

## Build
The simplest one is ```react-native run-android```.

Run the following command to generate a debug APK:
```
cd android && ./gradlew assembleDebug
```
Run the following command after connecting to device to install directly on device:
```
cd android && ./gradlew installRelease
```
For more details, follow this link: [Running on device](https://facebook.github.io/react-native/docs/running-on-device-android.html).

# iOS app

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

## Generate the staging / production ipa file
1.Create a `staging.env.json` or `production.env.json` file similar to the `env.json.example` and set the appropriate values.

2.Run the gulp task
``` bash
# For staging
gulp staging:build
# For production
gulp production:build
```

This generates `MoveIt.ipa` in the same directory.

Follow the above instructions if you wish to use the command line to generate the production ipa. For all dev and testing purposes use XCode.

## Create the JS bundle for CodePush
1.Create an environment config file as mentioned in the previos section.

2.Run the gulp task
``` bash
# For staging
gulp staging:ready-code-push
# For production
gulp production:ready-code-push
```

This generates `MoveIt.ipa` in the same directory.

Follow the above instructions if you wish to use the command line to generate the production ipa. For all dev and testing purposes use XCode.


## Contributing

### Commit message template
```
Platform[Android/iOS] | Commit excerpt in not more than 70 characters in present tense
+Pair | https://trello.com/path/to/relevant/card

# Why this change was needed. This can be

# Changes made in this commit in less than 20 words. If required use bullets here

# Side effects of the changes in less than 20 words. If required use bullets here

# Add Platform / Pair only when necessary
# Never use the -m <msg> / --message=<msg> flag to git commit.
# Read  https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message
```

See the [CONTRIBUTING] document.
Thank you, [contributors]!

  [CONTRIBUTING]: CONTRIBUTING.md
  [contributors]: https://github.com/multunus/moveit-mobile/graphs/contributors

## License

MoveIt and MoveIt React Native are Copyright (c) 2016 Multunus Software Pvt. Ltd.
It is free software, and may be redistributed
under the terms specified in the [LICENSE] file.

  [LICENSE]: /LICENSE

## About

![multunus](https://s3.amazonaws.com/multunus-images/Multunus_Logo_Vector_resized.png)

MoveIt React Native is maintained and funded by Multunus Software Pvt. Ltd.
The names and logos for Multunus are trademarks of Multunus Software Pvt. Ltd.

We love open source software!
See [our other projects][community]
or [hire us][hire] to help build your product.

  [community]: http://www.multunus.com/community?utm_source=github
  [hire]: http://www.multunus.com/contact?utm_source=github