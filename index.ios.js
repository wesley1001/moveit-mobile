'use strict';

var React = require('react-native');
var AddEntryPage = require('./app/components/addEntryPage/addEntryPage');
var Leaderboard = require('./app/components/leaderboard/leaderboard');

var {
  StyleSheet,
  Component,
  AppRegistry,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

class MoveItIOS extends Component {
  render() {
    return (
      <NavigatorIOS
        ref="nav"
        barTintColor="#FDC300"
        style={styles.container}
        initialRoute={{
          title: 'Add Entry',
          component: AddEntryPage,
          rightButtonTitle: 'Cancel',
          onRightButtonPress: () => {
            this.refs.nav.navigator.push({
              title: 'Leaderboard',
              component: Leaderboard
            })
          }
        }}
        />
    );
  }
}

AppRegistry.registerComponent('MoveItIOS', () => MoveItIOS);
