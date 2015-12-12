'use strict';

var React = require('react-native');
var Constants = require('./constants');
var AddEntryPage = require('./app/components/addEntryPage/addEntryPage');
var Leaderboard = require('./app/components/leaderboard/leaderboard');

const ROUTES = {
  'Add Entry': AddEntryPage,
  'Leaderboard': Leaderboard
}

var {
  StyleSheet,
  Component,
  AppRegistry,
  Navigator,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class MoveItIOS extends Component {
  componentDidMount() {
    AsyncStorage.setItem(Constants.USER_EMAIL_STORAGE_KEY, 'SOME_EMAIL_ADDRESS');
  }

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
