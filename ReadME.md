# MoveIt React Native

[![wercker status](https://app.wercker.com/status/cc2ce2f936b575a6a7f96e72085b4e06/m "wercker status")](https://app.wercker.com/project/bykey/cc2ce2f936b575a6a7f96e72085b4e06)

For more details of our MoveIt app, [head here](https://github.com/multunus/moveit-rails).

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

## Contributing

See the [CONTRIBUTING] document.
Thank you, [contributors]!

  [CONTRIBUTING]: CONTRIBUTING.md
  [contributors]: https://github.com/multunus/moveit-react-native/graphs/contributors

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
