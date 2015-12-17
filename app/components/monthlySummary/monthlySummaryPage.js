'use strict';

var React = require('react-native');
var Constants = require('../../../constants');
var NavBar = require('../navBar');
var Spinner = require('../spinner');
var LeaderboardPage = require('../leaderboard/leaderboardPage');
var TopSection = require('./topSection');
var ContributionSection = require('./contributionSection');
var MonthlySummaryList = require('./monthlySummaryList');
var moment = require('moment');

var {
  StyleSheet,
  Image,
  View,
  ListView,
  Text,
  Component
} = React;

var styles = StyleSheet.create({

});

class MonthlySummaryPage extends Component {
  constructor(props) {
    var date = new Date();
    super(props);
    this.state = {
      isLoading: false,
      message: '',
      month: date.getMonth(),
      year: date.getFullYear(),
      listItems: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    var user = this.props.user;
    return (
      <View style={{flex: 1}}>
        <NavBar
          navigator={this.props.navigator}
          title="Monthly Summary"
          showBackButton={true}
          />
        <TopSection
          name={user.name}
          email={user.email}
          avatar={user.gravatar}
          />
        <ContributionSection
          month={this.state.month}
          year={this.state.year}
          totalContribution={this.state.totalContribution}
          totalDuration={this.state.totalDuration}
          />
        {this.state.isLoading ? <Spinner /> : <View />}
        <MonthlySummaryList listItems={this.state.listItems}/>
      </View>
    );
  }

  fetchData() {
    this.setState({
      isLoading: true
    });
    fetch(this._monthlySummaryUrl())
    .then(response => response.json())
    .then(response => this._handleResponse(response))
    .catch(error => this.setState({
      isLoading: false
    }));
  }

  _handleResponse(response) {
    var monthlySummary = response.user.monthly_summary
    var totalContribution = monthlySummary.map((entry) => entry.amount_contributed)
    .reduce( (prev, curr) => prev + curr )
    var totalDuration = monthlySummary.map((entry) => entry.duration)
    .reduce( (prev, curr) => prev + curr )
    this.setState({
      isLoading: false,
      totalContribution: totalContribution,
      totalDuration: totalDuration,
      listItems: this.state.listItems.cloneWithRows(monthlySummary)
    });
  }

  _monthlySummaryUrl() {
    var data = {
      month: moment.monthsShort(this.state.month),
      email: this.props.user.email
    };
    var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

    return Constants.APP_SERVER_HOST + '/monthly_summary.json?' + querystring;
  }
}

module.exports = MonthlySummaryPage;
