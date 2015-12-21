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
    return(
      <LeaderboardEntry
        user={leaderboardItem}
        rank={parseInt(rowID) + 1}
        navigator={this.props.navigator}
        />
    );
  }

}

module.exports = LeaderboardList;
