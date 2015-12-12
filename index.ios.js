'use strict';

var React = require('react-native');
var Constants = require('./constants');
var LoginPage = require('./app/components/loginPage/loginPage');
var AddEntryPage = require('./app/components/addEntryPage/addEntryPage');
var Leaderboard = require('./app/components/leaderboard/leaderboard');

const ROUTES = {
  'Login Page': LoginPage,
  'Add Entry': AddEntryPage,
  'Leaderboard': Leaderboard
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
