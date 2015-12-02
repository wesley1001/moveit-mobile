'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Component,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 65,
    flex: 1
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  amount: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  duration: {
    fontSize: 18
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
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
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: leaderboardItem.gravatar }} />
          <View  style={styles.textContainer}>
            <Text style={styles.amount}>₹{leaderboardItem.amount}</Text>
            <Text style={styles.duration}>{leaderboardItem.duration} minutes</Text>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
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
      email: 'akshay.s@multunus.com'
    };

    var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

    return 'http://staging-move1t.herokuapp.com/leaderboard.json?' + querystring;
  }
}

module.exports = Leaderboard;
