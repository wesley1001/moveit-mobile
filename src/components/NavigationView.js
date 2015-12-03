import React, { Component, Text, View} from 'react-native';

export default class NavigationView extends Component {

  onSelect(item) {
    this.props.parent.drawer.closeDrawer();
    this.props.navigator.replace({name: item});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text
          style={{margin: 10, fontSize: 15, textAlign: 'left'}}
          onPress={() => this.onSelect("Leaderboard")}
        >
          Leaderboard</Text>
      </View>
    );
  }
}
