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
    right: 20
  },

  leftButton: {
    left: 20
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
            <Image source={this.props.rightButton} />
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
        <Image source={require('../img/back.png')} />
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
