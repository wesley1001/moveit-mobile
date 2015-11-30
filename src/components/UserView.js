import moment from 'moment';
import React, { Component, View, StyleSheet, Image, Text } from 'react-native';

export default class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user = this.props.user;
    return (
      <View style={styles.container}>
        <Image  style={[styles.thumb, user.status === 'active' ? {borderColor: 'green'} : {borderColor: 'yellow'}]} source={{ uri: user.gravatar + '&s=200'}} />
        <Text style={styles.rank}>#{this.props.rank}</Text>
        <Text style={styles.name}>
          {user.name}
        </Text>
        <View style={styles.amountSection}>
          <Text style={styles.amount}>
            ₹{user.activities.amount}
          </Text>
          <Text style={styles.duration}>
            {user.activities.duration} mins
          </Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  thumb: {
    flex: 0.2,
    resizeMode: 'contain',
    borderRadius: 50
  },
  rank: {
    flex: 0.2,
    alignSelf: 'center',
    fontSize: 20,
    color: '#bcbcbc'
  },
  name: {
    flex: 0.4,
    alignSelf: 'center',
    fontSize: 23,
    color: '#000'
  },
  amountSection: {
    flex: 0.2,
    flexWrap: 'nowrap',
    flexDirection: 'column',
  },
  amount: {
    color: '#757575',
    fontSize: 24,
    alignSelf: 'flex-end'
  },
  duration: {
    color: '#BDBDBD',
    fontSize: 14,
    alignSelf: 'flex-end'
  }
});
