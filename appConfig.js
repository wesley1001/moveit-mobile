'use strict';

import React from 'react-native';
import { RNConfig } from 'NativeModules';
import EnvConfig from './envConfig.json';

let environment = RNConfig.buildEnvironment;

let getAppServerRootURL = function() {
  return EnvConfig[environment].appServerRootURL;
}

let getCodePushKey = function() {
  return EnvConfig[environment].codePushKey;
}

export default {
  environment: environment,
  appServerRootURL: getAppServerRootURL(),
  codePushKey: getCodePushKey(),
  isDevelopment: function() {
    return environment === 'development';
  }
};
