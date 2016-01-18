'use strict';

var React = require('react-native');
var Constants = require('../../constants');
var NavBar = require('../navBar');
var Spinner = require('../spinner');
var UserAuthenticatedPage = require('../userAuthenticatedPage');
var TimelineList = require('./timelineList');
var moment = require('moment');

var {
  View,
  ListView,
  Component
} = React;

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
    var url = this._timelineUrl();
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

  _timelineUrl() {
    var data = {
      email: this.state.currentUser.email
    };
    var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

    return Constants.APP_SERVER_HOST + '/timeline_feed.json?' + querystring;
  }
}

module.exports = TimelinePage;
