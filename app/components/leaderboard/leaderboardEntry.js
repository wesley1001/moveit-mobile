'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19
  },
  name: {
    flex: 3,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  amount: {
    color: '#757575',
    fontSize: 20
  },
  duration: {
    fontSize: 12,
    color: '#BDBDBD'
  }
});

class LeaderboardEntry extends Component {
  render() {
    return(
      <View style={styles.rowContainer}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{ uri: this.props.gravatar }} />
        </View>
        <Text style={styles.name}>{this.props.name}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.amount}>₹{this.props.amount}</Text>
          <Text style={styles.duration}>{this.props.duration} mins</Text>
        </View>
      </View>
    );
  }
}

module.exports = LeaderboardEntry;
