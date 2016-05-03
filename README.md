# MoveIt React Native Apps

[![wercker status](https://app.wercker.com/status/cc2ce2f936b575a6a7f96e72085b4e06/m "wercker status")](https://app.wercker.com/project/bykey/cc2ce2f936b575a6a7f96e72085b4e06)

For more details of our MoveIt app, [head here](https://github.com/multunus/moveit-rails).

# Android app

## Usage
Follow the instructions here to [setup React Native](https://facebook.github.io/react-native/docs/getting-started.html).
Clone the repo and run this from inside the directory:
```
npm install
```
Make sure you have the [certificates for signing](https://trello.com/c/Kx1O4MB0/42-apk-signing) the builds in `android/app`. That's it - you're done.

## Configuration
Change the appropriate parameters in `envConfig.json`.

## Build

There are 3 different flavors of the app:
- Development
- Staging
- Production

The easiest way to get started is ```react-native run-android --flavor=<flavor>Debug```.

Run the following command to generate a debug APK:
```
cd android && ./gradlew assemble<Flavor>Debug
```
Run the following command after connecting to device to install directly on device:
```
cd android && ./gradlew install<Flavor>Release
```
For more details, follow this link: [Running on device](https://facebook.github.io/react-native/docs/running-on-device-android.html).

# iOS app

## Dev Setup
1.Clone the repo and install node packages:
``` bash
git clone git@github.com:multunus/moveit-mobile.git
cd moveit-mobile
npm install
```
2.Change the app server url to a local server in `envConfig.json` if required

3.Import the XCode project from the `ios/` directory.

4.Use the **MoveItDev** scheme for dev builds

## Building

There are different configurations and a scheme for each of them:
- Debug - MoveItDev
- Staging - MoveItStaging
- Release - MoveIt

For building the app make sure to set the appropriate values in `envConfig.json` and use one of the above schemes.
## Create and use a local JS bundle in development
1.Run script to bundle the JS code to a local file
``` bash
react-native bundle --entry-file index.ios.js --assets-dest ./release --bundle-output ./release/main.jsbundle --dev false --platform ios'
```

2.Comment the `if else` block in `AppDelegate.m` which sets the `jsCodeLocation`

3.Uncomment this line in `AppDelegate.m` -
```
jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
```

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
