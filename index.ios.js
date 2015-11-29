'use strict';

var React = require('react-native');
var AddEntryPage = require('./add_entry_page');

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
        barTintColor="#FDC300"
        style={styles.container}
        initialRoute={{
            title: 'Add Entry',
            component: AddEntryPage
        }}
        />
    );
  }
}

AppRegistry.registerComponent('MoveItIOS', () => MoveItIOS);
