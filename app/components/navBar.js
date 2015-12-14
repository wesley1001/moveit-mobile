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

  button: {
    position: 'absolute',
    top: 28
  },

  rightButton: {
    right: 8
  },

  leftButton: {
    left: 8
  },

  linkText: {
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
        {this.props.showBackButton ? this._backButton() : <View />}
        <View style={[styles.button, styles.rightButton]}>
          <TouchableOpacity onPress={this.onRightButtonPress.bind(this)}>
            <Text style={styles.linkText}>
              {this.props.rightButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _backButton() {
    return(
      <View style={[styles.button, styles.leftButton]}>
        <TouchableOpacity onPress={this.onLeftButtonPress.bind(this)}>
          <Text style={styles.linkText}>
            {'\u2039'} Back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  onLeftButtonPress() {
    var route = this.props.rightButtonLink;
    this.props.navigator.pop();
  }

  onRightButtonPress() {
    var route = this.props.rightButtonLink
    this.props.navigator.replace(route);
  }
}

module.exports = NavBar;
