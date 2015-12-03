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
  container: {
    padding: 20,
    marginTop: 65,
    flex: 1
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 40
  },
  textContainer: {
    flex: 1
  },
  amount: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  duration: {
    fontSize: 18
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class LeaderboardEntry extends Component {
  render() {
    return(
      <View style={styles.rowContainer}>
        <Image style={styles.thumb} source={{ uri: this.props.gravatar }} />
        <View  style={styles.textContainer}>
          <Text style={styles.amount}>₹{this.props.amount}</Text>
          <Text style={styles.duration}>{this.props.duration} minutes</Text>
        </View>
      </View>
    );
  }
}

module.exports = LeaderboardEntry;
