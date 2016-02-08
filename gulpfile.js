var gulp = require('gulp');
var jsonfile = require('jsonfile');
var env = require('./env.json');
var shell = require('shelljs');
var runSequence = require('run-sequence');

gulp.task('default', function() {
  console.log('NO DEFAULT TASK');
});

gulp.task('ios:build', function() {
  shell.config.silent = true;
  runSequence('ready-app-config', 'create-ipa', 'cleanup', 'reset-app-config');
});

gulp.task('ready-app-config', function() {
  var config = {
    jsScheme: 'codepush',
    gst: env.codePushKey,
    appServerRootURL: env.appServerRootURL
  }
  jsonfile.writeFileSync('./appConfig.json', config, {spaces: 2})
});

gulp.task('create-ipa', function() {
  shell.exec('xcodebuild -project ios/MoveIt.xcodeproj -scheme MoveIt -archivePath tmp/MoveIt archive');
  shell.exec('xcodebuild -exportArchive -exportOptionsPlist ios/MoveIt/exportOptions.plist -archivePath tmp/MoveIt.xcarchive -exportPath .');
});

gulp.task('cleanup', function() {
  shell.exec('xcodebuild clean -project ios/MoveIt.xcodeproj -alltargets',{silent:true});
  shell.rm('-rf', 'tmp/MoveIt.xcarchive');
});

gulp.task('reset-app-config', function() {
  var config = {
    appServerRootURL: "http://localhost:3000"
  }
  jsonfile.writeFileSync('./appConfig.json', config, {spaces: 2})
});

gulp.task('create-js-bundle', function() {
  shell.exec('react-native bundle --entry-file index.ios.js --assets-dest ./release --bundle-output ./release/main.jsbundle --dev false --platform ios');
});
