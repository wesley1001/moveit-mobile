'use strict';

var gulp = require('gulp');
var shell = require('shelljs');
var runSequence = require('run-sequence');

function _writeToAppConfig(config) {
  var jsonfile = require('jsonfile');
  jsonfile.writeFileSync('./appConfig.json', config, {spaces: 2});
}

gulp.task('default', function() {
  console.log('NO DEFAULT TASK');
});

gulp.task('cleanup', function() {
  shell.exec('xcodebuild clean -project ios/MoveIt.xcodeproj -alltargets',{silent:true});
  shell.rm('-rf', 'tmp/*');
});

gulp.task('reset-app-config', function() {
  var envConfig = {
    jsScheme: 'local',
    appServerRootURL: 'http://localhost:3000'
  };
  _writeToAppConfig(envConfig);
});

gulp.task('create-js-bundle', function() {
  shell.exec('react-native bundle --entry-file index.ios.js --assets-dest ./release --bundle-output ./release/main.jsbundle --dev false --platform ios');
});

gulp.task('staging:build', function() {
  shell.config.silent = true;
  runSequence('staging:ready-app-config', 'staging:create-ipa', 'cleanup', 'reset-app-config');
});

gulp.task('staging:ready-app-config', function() {
  var envConfig = require('./staging.env.json');
  _writeToAppConfig(envConfig);
});

gulp.task('staging:create-ipa', function() {
  shell.exec('xcodebuild archive -project ios/MoveIt.xcodeproj -scheme MoveItStaging -archivePath tmp/MoveItStaging');
  shell.exec('xcodebuild -exportArchive -exportOptionsPlist ios/MoveIt/exportOptions.plist -archivePath tmp/MoveItStaging.xcarchive -exportPath ipa/');
});

gulp.task('staging:ready-code-push', function() {
  shell.config.silent = true;
  runSequence('staging:ready-app-config', 'create-js-bundle', 'reset-app-config');
});

gulp.task('production:create-ipa', function() {
  shell.exec('xcodebuild archive -project ios/MoveIt.xcodeproj -scheme MoveIt -archivePath tmp/MoveIt');
  shell.exec('xcodebuild -exportArchive -exportOptionsPlist ios/MoveIt/exportOptions.plist -archivePath tmp/MoveIt.xcarchive -exportPath ipa/');
});

gulp.task('production:build', function() {
  shell.config.silent = true;
  runSequence('production:ready-app-config', 'production:create-ipa', 'cleanup', 'reset-app-config');
});

gulp.task('production:ready-app-config', function() {
  var envConfig = require('./production.env.json');
  _writeToAppConfig(envConfig);
});

gulp.task('production:ready-code-push', function() {
  shell.config.silent = true;
  runSequence('production:ready-app-config', 'create-js-bundle', 'reset-app-config');
});
