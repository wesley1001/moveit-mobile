'use strict';

var React = require('react-native');
var UserAuthenticatedPage = require('./userAuthenticatedPage');
var LeaderboardPage = require('./leaderboard/leaderboardPage');
var MonthlySummaryPage = require('./monthlySummary/monthlySummaryPage');

var {
  View,
  TabBarIOS,
  Text,
  Image
} = React;

class MainPage extends UserAuthenticatedPage {
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
        <TabBarIOS.Item
          title="Me"
          icon={ require('image!me') }
          selected={this.state.selectedTab === 'me'}
          onPress={() => this.setTab('me')}
          >
          <MonthlySummaryPage
            user={this.state.currentUser}
            showBackButton={false}
            />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = MainPage;
