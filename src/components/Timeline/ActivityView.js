import moment from 'moment';
import Modal from 'react-native-modalbox';

import React, { Component, View, StyleSheet, Image, Text } from 'react-native';

export default class ActivityView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let activity = this.props.activity;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image  style={styles.thumb} source={{ uri: activity.byUser.gravatar + '&s=200&d=mm'}} />
          <View style={styles.summary}>
            <View style={styles.movedIt}>
              <Text style={styles.name}>
                {activity.byUser.name}
              </Text>
              <Text style={styles.timeSince}>
                moved it {activity.timeSince}
              </Text>
            </View>
            <Text style={styles.contributionAndDuration}>
              for {activity.duration} mins & contributed ₹{activity.amountContributed}
            </Text>
          </View>
        </View>
        <Text style={styles.description}>
          {activity.description}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  header: {
    flex: 0.9,
    flexDirection: 'row'
  },
  summary: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    flexDirection: 'column'
  },
  thumb: {
    flex: 0.2,
    resizeMode: 'contain',
    borderRadius: 1000,
    height: 45,
    width: 45
  },
  contributionAndDuration: {
    color: '#b7b7b7',
    fontSize: 14,
    flexWrap: 'nowrap'
  },
  movedIt: {
    flexDirection: 'row'
  },
  timeSince: {
    color: '#797979'
  },
  name: {
    color: '#191919',
    marginRight: 5
  },
  description: {
    flex: 0.1,
    color: '#424242',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    flexWrap: 'wrap',
    textAlign: 'auto',
    resizeMode: 'stretch'
  }
});
