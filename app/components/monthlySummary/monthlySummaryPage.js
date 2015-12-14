'use strict';

var React = require('react-native');
var NavBar = require('../navBar');
var Spinner = require('../spinner');
var LeaderboardPage = require('../leaderboard/leaderboardPage');

var {
  StyleSheet,
  Image,
  View,
  ListView,
  Component
} = React;

var styles = StyleSheet.create({

});

class MonthlySummaryPage extends Component {
  render() {
    return (
      <View>
        <NavBar
          navigator={this.props.navigator}
          title="Monthly Summary"
          showBackButton={true}
          />
      </View>
    );
  }
}

module.exports = MonthlySummaryPage;
