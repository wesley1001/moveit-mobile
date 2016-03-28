import React, { Image, Component, Text, View, TouchableHighlight, StyleSheet, AsyncStorage, PropTypes } from 'react-native';
import moment from 'moment';

import User from '../models/User';

export default class NavigationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { gravatar: '' },
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('UserDetails').then((userData) => {
      let user = new User(JSON.parse(userData));
      this.setState({ user });
    });
  }

  onSelect(item) {
    this.props.parent.drawer.closeDrawer();
    this.props.navigator.push({ name: item });
  }

  render() {
    let christmasTime = moment().isBetween(moment('Dec 23 2015'), moment('Dec 26 2015'));
    return (
      <View style={styles.nav}>
        <Image source={christmasTime ? require('../img/snowfall.png') : { uri: 'http://lorempixel.com/400/200/abstract/' }}
          style={styles.background}
        >
          <Image source={{ uri: this.state.user.gravatar }}
            style={styles.thumb}
          />
        </Image>
        <View style={styles.container} >
          <TouchableHighlight onPress={() => this.onSelect('Add Entry')}
            style={styles.item}
            underlayColor="#DDD"
          >
            <Text style={styles.text}>
              Add Entry
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.onSelect('CharityView')}
            style={styles.item}
            underlayColor="#DDD"
          >
            <Text style={styles.text}>
              Charity
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.onSelect('Leaderboard')}
            style={styles.item}
            underlayColor="#DDD"
          >
            <Text style={styles.text}>
              Leaderboard
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.onSelect('Timeline')}
            style={styles.item}
            underlayColor="#DDD"
          >
            <Text style={styles.text}>
              Timeline
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.onSelect('Profile')}
            style={styles.item}
            underlayColor="#DDD"
          >
            <Text style={styles.text}>
              Profile
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

NavigationView.propTypes = {
  navigator: PropTypes.object,
  parent: PropTypes.object,
};

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  container: {
  },
  item: {
    flex: 0.2,
    height: 64,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 30,
    color: '#444',
    margin: 10,
    fontSize: 15,
    textAlign: 'left',
  },
  thumb: {
    resizeMode: 'contain',
    borderRadius: 1000,
    height: 150,
    marginTop: 20,
    marginBottom: 15,
  },
  background: {
    width: 250,
    height: 210,
  },
});
