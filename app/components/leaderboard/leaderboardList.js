'use strict';

var React = require('react-native');
var LeaderboardEntry = require('./leaderboardEntry');

var {
  View,
  ListView,
  Component
} = React;

class LeaderboardList extends Component {
  render() {
    return (
      <ListView
        dataSource={this.props.listItems}
        renderRow={this.renderItem.bind(this)}
        automaticallyAdjustContentInsets={false}
      />
    );
  }

  renderItem(leaderboardItem, sectionID, rowID) {
    var user = {
      name: leaderboardItem.name,
      email: leaderboardItem.email,
      avatar: leaderboardItem.gravatar,
      activityStatus: leaderboardItem.activity_status
    };
    var contribution = {
      duration: leaderboardItem.duration,
      amount: leaderboardItem.amount
    };
    return(
      <LeaderboardEntry
        currentUser={this.props.currentUser}
        user={user}
        contribution={contribution}
        rank={parseInt(rowID) + 1}
        navigator={this.props.navigator}
        interaction={leaderboardItem.interactable}
        />
    );
  }
}

module.exports = LeaderboardList;
