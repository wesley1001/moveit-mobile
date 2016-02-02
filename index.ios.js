'use strict';

import React, {
  StyleSheet,
  Component,
  AppRegistry,
  Navigator
} from 'react-native';
import LoginPage from './app/components/login/loginPage';
import AddEntryPage from './app/components/addEntry/addEntryPage';
import MonthlySummaryPage from './app/components/monthlySummary/monthlySummaryPage';
import MainPage from './app/components/mainPage';
import CodePush from 'react-native-code-push';

const ROUTES = {
  'Login': LoginPage,
  'Add Entry': AddEntryPage,
  'Monthly Summary': MonthlySummaryPage,
  'Main Page': MainPage
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class MoveIt extends Component {
  componentDidMount() {
    CodePush.sync();
  }

  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component navigator={navigator} {...route.passProps} />;
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
