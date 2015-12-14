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
    alignItems: 'center',
    borderColor: '#F6F6F6',
    borderBottomWidth: 1,
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2
  },
  nudge: {
    borderColor: '#FDC300'
  },
  bump: {
    borderColor: '#43CA01'
  },
  name: {
    flex: 3,
    fontSize: 20
  },
  rank: {
    flex: 1,
    fontSize: 20,
    color: '#BDBDBD'
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
    var user = this.props.user;
    return(
      <View style={styles.rowContainer}>
        <View style={styles.avatarContainer}>
          <Image style={[styles.avatar, styles[user.interactable]]} source={{ uri: user.gravatar }} />
        </View>
        <Text style={styles.rank}>#{this.props.rank}</Text>
        <Text style={styles.name}>{user.name}</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.amount}>₹{user.amount}</Text>
          <Text style={styles.duration}>{user.duration} mins</Text>
        </View>
      </View>
    );
  }
}

module.exports = LeaderboardEntry;
