'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Component
} = React;

var deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  profileBackground: {
    width: deviceWidth,
    position: 'absolute',
    height: 200,
    left: 0
  },
  avatarContainer: {
    alignItems: 'center'
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white'
  },
  avatarComponent: {
    padding: 2
  },
  name: {
    fontSize: 16,
    fontWeight: '500'
  },
  email: {
    fontSize: 12
  }
});

class TopSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.profileBackground}
          source={require('../../img/profile_background.jpg')}
          />
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{uri: this.props.avatar}}
            />
          <Text style={[styles.name, styles.avatarComponent]}>{this.props.name}</Text>
          <Text style={[styles.email, styles.avatarComponent]}>{this.props.email}</Text>
        </View>
      </View>
    );
  }
}

module.exports = TopSection;
