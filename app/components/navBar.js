'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Component
} = React;

var styles = StyleSheet.create({
  navBar: {
    height: 64,
    backgroundColor: '#FDC300',
    flex: 1,
    position: 'relative'
  },

  title: {
    paddingTop: 26,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center'
  },

  rightButton: {
    position: 'absolute',
    top: 28,
    right: 8
  },

  rightButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '400'
  }
});

class NavBar extends Component {
  render() {
    return(
      <View style={styles.navBar}>
        <Text style={styles.title}>{this.props.title}</Text>
        <View style={styles.rightButton}>
          <TouchableOpacity onPress={this.onRightButtonPress.bind(this)}>
            <Text style={styles.rightButtonText}>
              {this.props.rightButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onRightButtonPress() {
    var route = this.props.rightButtonLink
    this.props.navigator.replace(route);
  }
}

module.exports = NavBar;
