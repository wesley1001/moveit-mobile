'use strict';

import React from 'react-native';
import { RNConfig } from 'NativeModules';
import EnvConfig from './envConfig.json';

var getEnvironment = function() {
  return RNConfig.buildEnvironment;
}

var getAppServerRootURL = function() {
  return EnvConfig[getEnvironment()].appServerRootURL;
}

var getCodePushKey = function() {
  return EnvConfig[getEnvironment()].codePushKey;
}

export default {
  environment: getEnvironment(),
  appServerRootURL: getAppServerRootURL(),
  codePushKey: getCodePushKey(),
  isDevelopment: function() {
    return getEnvironment() === 'development';
  }
};
