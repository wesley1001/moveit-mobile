'use strict';

var React = require('react-native');
var Constants = require('../../../constants');
var LeaderboardEntry = require('./leaderboardEntry');
var SummaryBar = require('./summaryBar');
var NavBar = require('../navBar');
var Spinner = require('../spinner');
var AddEntryPage = require('../addEntry/addEntryPage');
var moment = require('moment');

var {
  Image,
  View,
  ListView,
  Component,
  AsyncStorage
} = React;

class LeaderboardPage extends Component {
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
    AsyncStorage.getItem(Constants.USER_EMAIL_STORAGE_KEY).then((value) => {
      this.setState({
        currentUser: {
          email: value
        }
      });
      this.fetchData();
    }).done(); //FixIt - Add a catch method
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

  render() {
    return (
      <View>
        <NavBar
          navigator={this.props.navigator}
          title="Leaderboard"
          rightButtonText="Add Entry"
          rightButtonLink={{name: 'Add Entry', component: AddEntryPage}}
          />
        <SummaryBar
        totalAmount={this.state.totalAmount}
        goalAmount={this.state.goalAmount}
        month={this.state.month}
        year={this.state.year}
        />
        {this.state.isLoading ? <Spinner /> : <View />}
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
      email: this.state.currentUser.email
    };
    var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

    return Constants.APP_SERVER_HOST + '/leaderboard.json?' + querystring;
  }
}

module.exports = LeaderboardPage;
