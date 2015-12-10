import moment from 'moment';
import React, { Component, View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';

export default class UserView extends Component {
  constructor(props) {
    super(props);
  }

  showProfile() {
    this.props.setGlobalState({ userProfile: this.props.user })
    this.props.navigator.replace({ name: 'Profile' });
  }

  render() {
    let user = this.props.user;
    return (
      <View style={styles.container}>
        <View style={[styles.backgroundCircle, user.status === 'active' ? {backgroundColor: '#43ca01'} : {backgroundColor: '#fdc300'}]}>
          <TouchableWithoutFeedback onPress={this.showProfile.bind(this)}>
            <Image  style={styles.thumb} source={{ uri: user.gravatar + '&s=200&d=mm'}} />
          </TouchableWithoutFeedback>
        </View>
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
    height: 50,
    width: 50,
    flex: 0.2,
    resizeMode: 'contain',
    borderRadius: 1000
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
  },
  backgroundCircle: {
    width: 56,
    height: 56,
    borderRadius: 56/2,
    alignItems:'center',
    justifyContent:'center'
}
});
