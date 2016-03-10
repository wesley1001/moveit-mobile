import moment from 'moment';
import Server from '../services/Server';
import UserView from './UserView';
import User from '../models/User';
import ActionButton from 'react-native-action-button';
import Vibration from 'react-native-vibration';
import React, { TouchableWithoutFeedback, TouchableOpacity, ToastAndroid, AsyncStorage, Component, PropTypes, ListView, View, ProgressBarAndroid, StyleSheet, Image, Text } from 'react-native';
import Modal from 'react-native-simple-modal';
import CountDown from './counter';

export default class LeaderboardView extends Component {
  constructor(props) {
    super(props);
    let currentMonth = moment().endOf('month').format('MMMM YYYY');
    this.state = {
      open: false,
      isLoading: false,
      user: {
        email: null,
      },
      month: currentMonth,
      users: [],
    };
    this.lastPress = 0;
  }

  componentDidMount() {
    AsyncStorage.getItem('UserDetails')
      .then((userData) => {
        let user = new User(JSON.parse(userData));
        this.setState({ user });
        this.reloadLeaderboard();
      })
      .catch(() => {
        this.props.navigator.replace({ name: 'Login' });
      });
  }

  onPressNewEntry() {
    this.props.navigator.replace({ name: 'Add Entry' });
  }

  getStoredLeaderboard() {
    return AsyncStorage.getItem('LeaderboardData');
  }

  storeData(data) {
    AsyncStorage.setItem('LeaderboardData', JSON.stringify(data));
  }

  getData() {
    let data = {
      email: this.state.user.email,
      month: this.state.month,
    };

    this.getStoredLeaderboard().then((storeLeaderboardData) => {
      let storedData = JSON.parse(storeLeaderboardData);
      let users = storedData.leaderboard.with_entries.concat(storedData.leaderboard.without_entries);
      let userList = users.map((userJSON)=> new User(userJSON));
      this.setState({
        users: userList,
        monthly_total_amount: storedData.monthly_total_amount,
        monthly_goal: storedData.monthly_goal,
      });
    });

    Server.get('/leaderboard.json', data)
    .then((data) => {
      this.storeData(data);
      let users = data.leaderboard.with_entries.concat(data.leaderboard.without_entries);
      let userList = users.map((userJSON)=> {
        if(this.state.user.email === userJSON.email) {
          userJSON.interactable = null;
        }
        return new User(userJSON);
      });
      this.setState({ isLoading: false,
                      users: userList,
                      monthly_total_amount: data.monthly_total_amount,
                      monthly_goal: data.monthly_goal,
                    });
      setTimeout(() => {
        if(this.props.amountContributed) {
          this.setState({ open: true });
        }
      }, 500);
    })
        .catch(() => {
          this.setState({ isLoading: false });
          setTimeout(() => {
            if(this.props.amountContributed) {
              this.setState({ open: true });
            }
          }, 500);
          ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
        });
  }

  reloadLeaderboard() {
    this.setState({ isLoading: true });
    this.getData();
  }

  processDoubleTap(userData) {
    let now = new Date().getTime();
    if (now - this.lastPress < 500) {
      this.performInteraction(userData);
      userData.interactable = 'none';
    }
    this.lastPress = now;
  }

  performInteraction(userData) {
    if(userData.interactable === 'bump' || userData.interactable === 'nudge') {
      let data = {
        from_email_id: this.state.user.email,
        to_email_id: userData.email,
        interaction_type: userData.interactable,
      };
      Vibration.vibrate(200);
      Server.post('/interaction.json', data)
        .then(() => {
          this.forceUpdate();
          userData.interactable = null;
          let toast = (userData.status === 'active' ? 'You Bump\'d ' : 'You Nudg\'d ') + userData.name;
          ToastAndroid.show(toast, ToastAndroid.SHORT, 500);
        })
        .catch(() => {
          ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
        });
    }
  }

  borderStyle(interactable) {
    if (interactable === 'bump') {
      return { borderLeftColor: '#43ca01' };
    }
    else if (interactable === 'nudge') {
      return { borderLeftColor: '#fdc300' };
    }
    else {
      return { borderLeftColor: 'white' };
    }
  }

  showRow(userData, sectionID, rowID) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.processDoubleTap(userData)}
      >
        <View style={[styles.row, userData.email !== this.state.user.email ? this.borderStyle(userData.interactable) : null ]}>
          <UserView rank={parseInt(rowID) + 1}
            user={userData}
            {...this.props}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  userList() {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return ds.cloneWithRows(this.state.users);
  }


  render() {
    let christmasTime = moment().isBetween(moment('Dec 23 2015'), moment('Jan 2 2016'));
    let logoimage = christmasTime ? require('../img/christmas.png') : require('../img/logo.png');
    if(this.state.isLoading) {
      return (
          <View style={styles.progressBar}>
            <ProgressBarAndroid  styleAttr="Inverse"/>
          </View>
        );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={logoimage}
              style={styles.logo}
            />
            <View style={styles.headerText}>
              <Text style={styles.month}>{this.state.month}</Text>
              <View style={styles.amountSection}>
                <Text style={styles.monthlyTotalAmount}>₹{this.state.monthly_total_amount}</Text>
                <Text style={styles.monthlyGoal}> / ₹{this.state.monthly_goal}</Text>
              </View>
            </View>
          </View>
          <Modal modalDidClose={() => this.setState({ open: false })}
            open={this.state.open}
            style={{ alignItems: 'stretch', height: 370, padding: 0 }}
          >
            <View style={{ backgroundColor: '#FEE66C', height: 70, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'rgba(0, 0, 0, 0.66)', fontWeight: 'bold', fontSize: 20 }}>Congratulations!</Text>
            </View>
            <View style={{ marginTop: 30, marginBottom: 5, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'rgba(0, 0, 0, 0.66)', fontWeight: '400', fontSize: 80 }}>
                ₹
                <CountDown endTime={this.props.amountContributed}
                  time={this.props.amountContributed - 30}
                />
              </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#9e9e9e', fontWeight: 'normal', fontSize: 40 }}>contributed</Text>
            </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ open: false })}
                  style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, backgroundColor:'#43ca01', width: 300, height: 50 }}
                >
                  <Text style={{ color: 'white' }}>I FEEL GOOOOOD!</Text>
                </TouchableOpacity>
              </View>
          </Modal>
          {
            this.state.open ? null :
            <ListView
              dataSource={this.userList()}
              renderRow={this.showRow.bind(this)}
            />
          }
          {
            this.state.open ? null :
            <ActionButton
              buttonColor="rgb(253, 195, 0)"
              onPress={() => this.onPressNewEntry()}
            />
          }
        </View>
      );
    }
  }
}

LeaderboardView.propTypes = {
  amountContributed: PropTypes.object,
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    height: 78,
    backgroundColor: '#FEE66C',
  },
  headerText: {
    flexDirection: 'column',
    flex: 0.7,
  },
  logo: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
    flex: 0.3,
  },
  month: {
    color: '#000',
    fontSize: 18,
  },
  amountSection: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  monthlyTotalAmount: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  monthlyGoal: {
    color: '#BBAA4E',
    fontSize: 13,
    marginBottom: 2,
  },
  row: {
    borderLeftWidth: 5,
    flexDirection: 'row',
    padding: 10,
    borderColor: '#F6F6F6',
    borderBottomWidth: 2,
    flex: 100,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
