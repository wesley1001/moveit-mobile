'use strict';

var React = require('react-native');
var LeaderboardEntry = require('./leaderboardEntry');
var SummaryBar = require('./summaryBar');
var moment = require('moment');

var {
  StyleSheet,
  Image,
  View,
  ListView,
  Component,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1
  }
});

class Leaderboard extends Component {
  constructor(props) {
    var date = new Date();
    super(props);
    this.state = {
      month: date.getMonth(),
      year: date.getFullYear(),
      isLoading: false,
      itemsWithEntries: new ListView.DataSource({
        rowHasChanged: ((r1, r2) => (r1.amount !== r2.amount) || (r1.duration !== r2.duration))
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  renderItem(leaderboardItem, sectionID, rowID) {
    return(
      <LeaderboardEntry
        gravatar={leaderboardItem.gravatar}
        name={leaderboardItem.name}
        rank={parseInt(rowID) + 1}
        amount={leaderboardItem.amount}
        duration={leaderboardItem.duration}
      >
      </LeaderboardEntry>
    );
  }

  render() {
    var spinner = this.state.isLoading ?
    (<ActivityIndicatorIOS hidden="true" size="large"/>) :
    (<View />);
    return (
      <View style={styles.container}>
        <SummaryBar
        totalAmount={this.state.totalAmount}
        goalAmount={this.state.goalAmount}
        month={this.state.month}
        year={this.state.year}
        />
        {spinner}
        <ListView
          dataSource={this.state.itemsWithEntries}
          renderRow={this.renderItem.bind(this)}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }

  fetchData() {
    this.setState({
      isLoading: true
    });
    var url = this._leaderboardUrl();
    fetch(url)
    .then(response => response.json())
    .then(response => this._handleResponse(response))
    .catch(error => this.setState({
      isLoading: false
    }));
  }

  _handleResponse(response) {
    var itemsWithEntries = response.leaderboard.with_entries;
    this.setState({
      totalAmount: response.monthly_total_amount,
      goalAmount: response.monthly_goal,
      itemsWithEntries: this.state.itemsWithEntries.cloneWithRows(itemsWithEntries),
      isLoading: false
    });
  }

  _leaderboardUrl() {
    var data = {
      month: moment.monthsShort(this.state.month),
      email: 'USERNAME@multunus.com'
    };

    var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

    return 'http://staging-move1t.herokuapp.com/leaderboard.json?' + querystring;
  }
}

module.exports = Leaderboard;
