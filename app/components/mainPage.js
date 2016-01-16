'use strict';

var React = require('react-native');
var LeaderboardPage = require('./leaderboard/leaderboardPage');

var {
  Component,
  View,
  TabBarIOS,
  Text,
  Image
} = React;

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'leaderboard'
    };
  }

  setTab(tabId) {
    this.setState({selectedTab: tabId});
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Leaderboard"
          icon={ require('image!leaderboard') }
          selected={this.state.selectedTab === 'leaderboard'}
          onPress={() => this.setTab('leaderboard')}
          >
          <LeaderboardPage
            navigator={this.props.navigator}
            />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = MainPage;
