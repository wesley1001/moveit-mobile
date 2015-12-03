'use strict';

var React = require('react-native');
var LeaderboardEntry = require('./leaderboardEntry');
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
    padding: 20,
    marginTop: 65,
    flex: 1
  }
});

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      itemsWithEntries: new ListView.DataSource({
        rowHasChanged: ((r1, r2) => (r1.amount !== r2.amount) || (r1.duration !== r2.duration))
      })
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  renderItem(leaderboardItem) {
    return(
      <LeaderboardEntry
        gravatar={leaderboardItem.gravatar}
        amount={leaderboardItem.amount}
        duration={leaderboardItem.duration}
        name={leaderboardItem.name}
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
        {spinner}
        <ListView
          dataSource={this.state.itemsWithEntries}
          renderRow={this.renderItem.bind(this)}
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
      itemsWithEntries: this.state.itemsWithEntries.cloneWithRows(itemsWithEntries),
      isLoading: false
    });
  }

  _leaderboardUrl() {
    var data = {
      month: 'Dec',
      email: 'USERNAME@multunus.com'
    };

    var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

    return 'http://staging-move1t.herokuapp.com/leaderboard.json?' + querystring;
  }
}

module.exports = Leaderboard;
