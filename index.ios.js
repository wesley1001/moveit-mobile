'use strict';

var React = require('react-native');
var Constants = require('./constants');
var LoginPage = require('./app/components/login/loginPage');
var AddEntryPage = require('./app/components/addEntry/addEntryPage');
var LeaderboardPage = require('./app/components/leaderboard/leaderboardPage');

const ROUTES = {
  'Login': LoginPage,
  'Add Entry': AddEntryPage,
  'Leaderboard': LeaderboardPage
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

class MoveItIOS extends Component {
  renderScene(route, navigator) {
    var Component = ROUTES[route.name];
    return(<Component navigator={navigator} />);
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

AppRegistry.registerComponent('MoveItIOS', () => MoveItIOS);
