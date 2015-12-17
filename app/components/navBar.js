'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Component
} = React;

var styles = StyleSheet.create({
  navBar: {
    height: 64,
    backgroundColor: '#FDC300',
    position: 'relative'
  },

  title: {
    paddingTop: 27,
    fontSize: 20,
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
    left: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  backIcon: {
    width: 9,
    height: 15,
    marginRight: 3
  },

  linkText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '400'
  }
});

class NavBar extends Component {
  render() {
    return(
      <View style={styles.navBar}>
        <Text style={styles.title}>{this.props.title}</Text>
        {this.props.showBackButton ? this._backButton() : <View />}
          <TouchableOpacity
            style={[styles.button, styles.rightButton]}
            onPress={this.onRightButtonPress.bind(this)}
            >
            <Text style={styles.linkText}>
              {this.props.rightButtonText}
            </Text>
          </TouchableOpacity>
      </View>
    );
  }

  _backButton() {
    return(
      <TouchableOpacity
        style={[styles.button, styles.leftButton]}
        onPress={this.onLeftButtonPress.bind(this)}
        >
        <Image
          style={styles.backIcon}
          source={require('../img/back_icon.png')}
          />
        <Text style={styles.linkText}>Back</Text>
      </TouchableOpacity>
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
