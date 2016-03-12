'use strict';

import React, {
  View,
  ListView,
  Component
} from 'react-native';
import NavBar from '../navBar';
import Spinner from '../spinner';
import UserAuthenticatedPage from '../userAuthenticatedPage';
import TimelineList from './timelineList';
import moment from 'moment';
import URLBuilder from '../../urlBuilder';

class TimelinePage extends UserAuthenticatedPage {
  constructor(props) {
    var date = new Date();
    super(props);
    this.state = {
      month: date.getMonth(),
      year: date.getFullYear(),
      isLoading: false,
      listItems: new ListView.DataSource({
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
          title="Timeline"
          />
        {this.state.isLoading ? <Spinner /> : <View />}
        <TimelineList listItems={this.state.listItems}/>
      </View>
    );
  }

  fetchData() {
    this.setState({
      isLoading: true
    });
    let url = URLBuilder.timelineURL({
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
    var listItems = response.timeline_activities;
    this.setState({
      totalAmount: response.monthly_total_amount,
      goalAmount: response.monthly_goal,
      listItems: this.state.listItems.cloneWithRows(listItems),
      isLoading: false
    });
  }
}

module.exports = TimelinePage;
