'use strict';

import { RNConfig } from 'NativeModules';
import EnvConfig from './envConfig.json';

let environment = RNConfig.buildEnvironment;

let getAppServerRootURL = function() {
  return EnvConfig[environment].appServerRootURL;
}

let getCodePushKey = function() {
  return EnvConfig[environment].codePushKey;
}

let getCharitySpreadSheetUrl = function() {
  return EnvConfig[environment].charitySpreadSheetUrl;
}

export default {
  environment: environment,
  appServerRootURL: getAppServerRootURL(),
  codePushKey: getCodePushKey(),
  charitySpreadSheetUrl: getCharitySpreadSheetUrl(),
  isDevelopment: function() {
    return environment === 'development';
  }
};
