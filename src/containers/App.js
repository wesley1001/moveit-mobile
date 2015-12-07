import React, { Component, DrawerLayoutAndroid, ToolbarAndroid, StyleSheet, Navigator } from 'react-native';
import Orientation from 'react-native-orientation-controller';

import EntryView from './../components/EntryView.js';
import LeaderboardView from './../components/LeaderboardView.js';
import NavigationView from './../components/NavigationView.js';
import LoginView from './../components/LoginView.js';
import TimelineView from './../components/Timeline/TimelineView.js';
import SplashScreen from '@remobile/react-native-splashscreen';


let DRAWER_WIDTH = 250;
const ROUTES = {
  'Add Entry': EntryView,
  'Leaderboard': LeaderboardView,
  'Login': LoginView,
  'Timeline': TimelineView
};

export default class MoveIt extends Component {
  componentDidMount() {
    Orientation.rotate(0);
    Orientation.addApplicationListener(this._setOrientation);
    SplashScreen.hide();
  }

  _setOrientation(orientation, device, size) {
    Orientation.rotate(0);
  }

  componentDidUnMount() {
     Orientation.removeDeviceListener(this._setOrientation);
  }

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];

    return (
      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={DRAWER_WIDTH}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={() => {return <NavigationView navigator={navigator} parent={this}/>;}}
      >
        <ToolbarAndroid
          style={styles.toolbar}
          navIcon={require('./../img/ic_menu_black_24dp.png')}
          onIconClicked={() => this.drawer.openDrawer()}
          title={route.name}
        />
        <Component navigator={navigator}/>
      </DrawerLayoutAndroid>
    );
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        initialRoute={{ name: 'Add Entry' }}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#fdc300',
    height: 56,
  },
});
