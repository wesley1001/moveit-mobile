'use strict';

import React, {
  Component,
  AppRegistry,
  Navigator,
  AlertIOS
} from 'react-native';
import LoginPage from './app/components/login/loginPage';
import AddEntryPage from './app/components/addEntry/addEntryPage';
import MonthlySummaryPage from './app/components/monthlySummary/monthlySummaryPage';
import MainPage from './app/components/mainPage';
import CodePush from 'react-native-code-push';
import AppConfig from './appConfig.js';

const RoutableComponents = {
  'Login': LoginPage,
  'Add Entry': AddEntryPage,
  'Monthly Summary': MonthlySummaryPage,
  'Main Page': MainPage
};

class MoveIt extends Component {
  componentDidMount() {
    if(!AppConfig.isDevelopment()) {
      CodePush.sync({
        deploymentKey: AppConfig.codePushKey,
        updateDialog: {
          appendReleaseDescription: true,
          descriptionPrefix: '\n\nChange log:\n'
        },
        installMode: CodePush.InstallMode.IMMEDIATE
      }, (status) => {
        if(status === CodePush.SyncStatus.DOWNLOADING_PACKAGE) {
          AlertIOS.alert(
            'Installing Update',
            'Please wait for the app to refresh automatically'
          );
        }
      });
    }
  }

  renderScene(route, navigator) {
    var RoutableComponent = RoutableComponents[route.name];
    return <RoutableComponent navigator={navigator} {...route.passProps} />;
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Add Entry', component: AddEntryPage}}
        renderScene={this.renderScene.bind(this)}
        />
    );
  }
}

AppRegistry.registerComponent('MoveIt', () => MoveIt);
