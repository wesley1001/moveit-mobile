# MoveIt

[![wercker status](https://app.wercker.com/status/cc2ce2f936b575a6a7f96e72085b4e06/m "wercker status")](https://app.wercker.com/project/bykey/cc2ce2f936b575a6a7f96e72085b4e06)

### Dev Setup
Follow the instructions here to [setup Android environment](https://facebook.github.io/react-native/docs/android-setup.html).
Clone the repo and run this from inside the directory:
```
npm install
```
That's it - you're done.

### Build
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
