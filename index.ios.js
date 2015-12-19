'use strict';

var React = require('react-native');
var Constants = require('./constants');
var LoginPage = require('./app/components/login/loginPage');
var AddEntryPage = require('./app/components/addEntry/addEntryPage');
var LeaderboardPage = require('./app/components/leaderboard/leaderboardPage');
var MonthlySummaryPage = require('./app/components/monthlySummary/monthlySummaryPage');

const ROUTES = {
  'Login': LoginPage,
  'Add Entry': AddEntryPage,
  'Leaderboard': LeaderboardPage,
  'Monthly Summary': MonthlySummaryPage
}

var {
  StyleSheet,
  Component,
  AppRegistry,
  Navigator
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class MoveIt extends Component {
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
