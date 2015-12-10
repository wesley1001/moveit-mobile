import React, { Image, Component, Text, View, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';

import User from '../models/User'

export default class NavigationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { gravatar: '' }
    };
  }

  onSelect(item) {
    this.props.parent.drawer.closeDrawer();
    this.props.navigator.replace({ name: item });
  }

  componentDidMount() {
    AsyncStorage.getItem('UserDetails').then((userData) => {
      let user = new User(JSON.parse(userData));
      this.setState({ user: user });
    });
  }

  render() {
    return (
      <View style={styles.nav}>
        <Image source={{ uri: 'http://lorempixel.com/400/200/abstract/' }}>
          <Image  style={styles.thumb} source={{ uri: this.state.user.gravatar }} />
        </Image>
        <View style={styles.container} >
          <TouchableHighlight onPress={() => this.onSelect("Add Entry")} style={styles.item} underlayColor="#DDD">
            <Text style={styles.text}>
              Add Entry
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.onSelect("Leaderboard")} style={styles.item} underlayColor="#DDD">
            <Text style={styles.text}>
              Leaderboard
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.onSelect("Timeline")} style={styles.item} underlayColor="#DDD">
            <Text style={styles.text}>
              Timeline
            </Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.onSelect("Profile")} style={styles.item} underlayColor="#DDD">
            <Text style={styles.text}>
              Profile
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  nav: {
    flex: 0.8,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  container: {
  },
  item: {
    height: 64,
    justifyContent: 'center'
  },
  text: {
    marginLeft: 30,
    color: '#444',
    margin: 10,
    fontSize: 15,
    textAlign: 'left'
  },
  thumb: {
    resizeMode: 'contain',
    borderRadius: 1000,
    height: 150,
    marginTop: 20,
    marginBottom: 15
  },
});
