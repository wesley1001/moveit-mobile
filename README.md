# MoveIt iOS

React Native iOS app for MoveIt.

For more details of our MoveIt app, [head here](https://github.com/multunus/moveit-rails).

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

## Contributing

See the [CONTRIBUTING] document.
Thank you, [contributors]!

  [CONTRIBUTING]: CONTRIBUTING.md
  [contributors]: https://github.com/multunus/moveit-ios/graphs/contributors

## License

MoveIt and MoveIt iOS are Copyright (c) 2016 Multunus Software Pvt. Ltd.
It is free software, and may be redistributed
under the terms specified in the [LICENSE] file.

  [LICENSE]: /LICENSE

## About

![multunus](https://s3.amazonaws.com/multunus-images/Multunus_Logo_Vector_resized.png)

MoveIt iOS is maintained and funded by Multunus Software Pvt. Ltd.
The names and logos for Multunus are trademarks of Multunus Software Pvt. Ltd.

We love open source software!
See [our other projects][community]
or [hire us][hire] to help build your product.

  [community]: http://www.multunus.com/community?utm_source=github
  [hire]: http://www.multunus.com/contact?utm_source=github
