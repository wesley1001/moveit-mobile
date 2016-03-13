./setup.sh
cd android && ./gradlew assembleRelease
cp ./app/build/outputs/apk/app-release.apk ../
cd ../
