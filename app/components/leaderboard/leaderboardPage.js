'use strict';

var React = require('react-native');
var Constants = require('../../constants');
var UserAuthenticatedPage = require('../userAuthenticatedPage');
var LeaderboardList = require('./leaderboardList');
var SummaryBar = require('./summaryBar');
var NavBar = require('../navBar');
var Spinner = require('../spinner');
var AddEntryPage = require('../addEntry/addEntryPage');
var moment = require('moment');

var {
  View,
  ListView,
  Component
} = React;

class LeaderboardPage extends UserAuthenticatedPage {
  constructor(props) {
    var date = new Date();
    super(props);
    this.state = {
      month: date.getMonth(),
      year: date.getFullYear(),
      isLoading: false,
      itemsWithEntries: new ListView.DataSource({
        rowHasChanged: ((r1, r2) => (r1 !== r2))
      })
    };
  }

  _afterCurrentUserAvailable() {
    this.fetchData();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavBar
          navigator={this.props.navigator}
          title="Leaderboard"
          rightButton={require('../../img/add.png')}
          rightButtonLink={{name: 'Add Entry', component: AddEntryPage}}
          />
        <SummaryBar
        totalAmount={this.state.totalAmount}
        goalAmount={this.state.goalAmount}
        month={this.state.month}
        year={this.state.year}
        />
        {this.state.isLoading ? <Spinner /> : <View />}
        <LeaderboardList
          currentUser={this.state.currentUser}
          listItems={this.state.itemsWithEntries}
          navigator={this.props.navigator}
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
      email: this.state.currentUser.email
    };
    var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

    return Constants.APP_SERVER_HOST + '/leaderboard.json?' + querystring;
  }
}

module.exports = LeaderboardPage;
