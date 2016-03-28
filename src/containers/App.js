import React, { BackAndroid, Component, DrawerLayoutAndroid, ToolbarAndroid, StyleSheet, Navigator } from 'react-native';

import EntryView from './../components/EntryView.js';
import LeaderboardView from './../components/LeaderboardView.js';
import NavigationView from './../components/NavigationView.js';
import LoginView from './../components/LoginView.js';
import TimelineView from './../components/Timeline/TimelineView.js';
import ProfileView from './../components/Profile/ProfileView.js';
import SplashScreen from '@remobile/react-native-splashscreen';
import CharityView from './../components/Charity/CharityView.js'

let DRAWER_WIDTH = 250;
const ROUTES = {
  'Add Entry': EntryView,
  'Leaderboard': LeaderboardView,
  'Login': LoginView,
  'Timeline': TimelineView,
  'Profile': ProfileView,
  'CharityView': CharityView
};

export default class MoveIt extends Component {
  constructor(props) {
    super(props);
    this.navigator = {};
  }

  componentDidMount() {
    SplashScreen.hide();
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator.getCurrentRoutes().length === 1  ) {
        return false;
      }
      this.navigator.pop();
      return true;
    });
  }

  setGlobalState(state) {
    this.setState(state);
  }

  renderScene(route, navigator) {
    let Component = ROUTES[route.name];
    return (
      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={DRAWER_WIDTH}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={() => {
          return (
          <NavigationView navigator={navigator}
            parent={this}
          />);
        }}
      >
        <ToolbarAndroid navIcon={require('./../img/ic_menu_black_24dp.png')}
          onIconClicked={() => this.drawer.openDrawer()}
          style={styles.toolbar}
          title={route.name}
        />
      <Component amountContributed={route.amountContributed}
        globalState={this.state}
        navigator={navigator}
        setGlobalState={this.setGlobalState.bind(this)}
      />
      </DrawerLayoutAndroid>
    );
  }

  render() {
    return (
      <Navigator initialRoute={{ name: 'Add Entry' }}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={this.renderScene.bind(this)}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#fdc300',
    height: 56,
  },
});
