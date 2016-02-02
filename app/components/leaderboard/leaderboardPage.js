'use strict';

import React, {View, ListView, Component} from 'react-native';
import UserAuthenticatedPage from '../userAuthenticatedPage';
import LeaderboardList from './leaderboardList';
import SummaryBar from './summaryBar';
import NavBar from '../navBar';
import Spinner from '../spinner';
import AddEntryPage from '../addEntry/addEntryPage';
import moment from 'moment';
import URLBuilder from '../../urlBuilder';

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
    let url = URLBuilder.leaderboardURL({
      month: moment.monthsShort(this.state.month),
      email: this.state.currentUser.email
    });
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
}

module.exports = LeaderboardPage;
