'use strict';

var React = require('react-native');
var Constants = require('../../constants');
var MonthlySummaryPage = require('../monthlySummary/monthlySummaryPage');
var Swipeout = require('react-native-swipeout');

var {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Component
} = React;

const INTERACTION_COLORS = {
  bump: '#43CA01',
  nudge: '#FDC300'
};

const SWIPE_ACTIONS = {
  bump: 'Bumping',
  nudge: 'Nudging'
}

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F6F6F6',
    borderBottomWidth: 1,
    borderLeftWidth: 5
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2
  },
  inactive: {
    borderColor: INTERACTION_COLORS.nudge
  },
  active: {
    borderColor: INTERACTION_COLORS.bump
  },
  name: {
    flex: 3,
    fontSize: 20
  },
  rank: {
    flex: 1,
    fontSize: 20,
    color: '#BDBDBD'
  },
  scoreContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  amount: {
    color: '#757575',
    fontSize: 20
  },
  duration: {
    fontSize: 12,
    color: '#BDBDBD'
  }
});

class LeaderboardEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeSwipe: false,
      isInteractable: (!this._isForCurrentUser()
      && this.props.interaction !== 'none')
    };
  }

  render() {
    var {
      user,
      contribution,
      interaction
    } = this.props;
    var swipeoutBtns = [{
      text: SWIPE_ACTIONS[interaction],
      backgroundColor: INTERACTION_COLORS[interaction]
    }];
    return(
      <Swipeout
        close={this.state.closeSwipe}
        left={this.state.isInteractable && swipeoutBtns}
        backgroundColor="white"
        onOpen={this.onSwipeRight.bind(this)}
        >
        <TouchableOpacity
          style={[
            styles.rowContainer,
            this.state.isInteractable && {
              borderLeftColor: INTERACTION_COLORS[interaction]
            }]}
          onPress={this.onPress.bind(this)}
          >
          <View style={styles.avatarContainer}>
            <Image
              style={[styles.avatar, styles[user.activityStatus]]}
              source={{ uri: user.avatar }}
              />
          </View>
          <Text style={styles.rank}>#{this.props.rank}</Text>
          <Text style={styles.name}>
            {this._isForCurrentUser() ? 'YOU' : user.name }
          </Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.amount}>₹{contribution.amount}</Text>
            <Text style={styles.duration}>{contribution.duration} mins</Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }

  onPress() {
    this.props.navigator.push({
      name: 'Monthly Summary',
      component: MonthlySummaryPage,
      passProps: {
        user: this.props.user,
        showBackButton: true
      }
    });
  }

  onSwipeRight() {
    if(this.state.isInteractable) {
      var data = {
        from_email_id: this.props.currentUser.email,
        to_email_id: this.props.user.email,
        interaction_type: this.props.interaction
      }
      var url = Constants.APP_SERVER_HOST + '/interaction';
      this._postToUrl(url, data);
    }
  }

  _postToUrl(url, data) {
    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(JSON.parse(response._bodyText).error); //FixIt - Shoudn't be using the quasi private method
      }
    })
    .then(response => this._handleResponse(response))
    .catch(error => this.setState({
      message: error.message
    }));
  }

  _handleResponse(response) {
    this.setState({
      isInteractable: false,
      closeSwipe: true
    });
    console.log('Response: ' + JSON.stringify(response));
  }

  _isForCurrentUser(user) {
    return this.props.currentUser.email === this.props.user.email;
  }
}

module.exports = LeaderboardEntry;
