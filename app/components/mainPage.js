'use strict';

var React = require('react-native');
var UserAuthenticatedPage = require('./userAuthenticatedPage');
var TimelinePage = require('./timeline/timelinePage');
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

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Timeline"
          icon={ require('image!timeline') }
          selected={this.state.selectedTab === 'timeline'}
          onPress={() => this.setState({selectedTab: 'timeline'})}
          >
          <TimelinePage />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Leaderboard"
          icon={ require('image!leaderboard') }
          selected={this.state.selectedTab === 'leaderboard'}
          onPress={() => this.setState({selectedTab: 'leaderboard'})}
          >
          <LeaderboardPage
            navigator={this.props.navigator}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Me"
          icon={ require('image!me') }
          selected={this.state.selectedTab === 'me'}
          onPress={() => this.setState({selectedTab: 'me'})}
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
