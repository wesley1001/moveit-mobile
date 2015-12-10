import moment from 'moment';
import Server from '../services/Server';
import UserView from './UserView';
import User from '../models/User';
import ActionButton from 'react-native-action-button';
import Vibration from 'react-native-vibration';
import { MKButton } from 'react-native-material-kit';
import React, { TouchableWithoutFeedback, ToastAndroid, AsyncStorage, Component, ScrollView, ListView, View, ProgressBarAndroid, StyleSheet, Image,Text } from 'react-native';

export default class LeaderboardView extends Component {
  constructor(props) {
    super(props);
    let currentMonth = moment().endOf('month').format('MMMM YYYY');
    this.state = {
      isLoading: false,
      user: {
        email: null
      },
      month: currentMonth,
      users: []
    };
    this.lastPress = 0;
  }

  onPressNewEntry() {
    this.props.navigator.replace({name: "Add Entry"});
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
      month: this.state.month
    };

    this.getStoredLeaderboard().then((storeLeaderboardData) => {
      let storedData = JSON.parse(storeLeaderboardData);
      let users = storedData.leaderboard.with_entries.concat(storedData.leaderboard.without_entries);
      let userList = users.map((userJSON)=> new User(userJSON));
      this.setState({
        users: userList,
        monthly_total_amount: storedData.monthly_total_amount,
        monthly_goal: storedData.monthly_goal
      });
    });

    Server.get('/leaderboard.json', data).then((data) => {
        this.storeData(data);
        let users = data.leaderboard.with_entries.concat(data.leaderboard.without_entries);
        let userList = users.map((userJSON)=> new User(userJSON));
        this.setState({ isLoading: false,
                      users: userList,
                      monthly_total_amount: data.monthly_total_amount,
                      monthly_goal: data.monthly_goal
                    });
        }).catch((err) => {
          this.setState({ isLoading: false });
          ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
        });
  }

  reloadLeaderboard() {
    this.setState({ isLoading: true });
    this.getData();
  }

  componentDidMount() {
    AsyncStorage.getItem('UserDetails')
      .then((userData) => {
        let user = new User(JSON.parse(userData));
        this.setState({ user: user });
        this.reloadLeaderboard();
      })
      .catch(() => {
        this.props.navigator.replace({ name: 'Login' });
      });
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
    if(this.state.user.email !== userData.email && userData.interactable !== 'none') {
      let data = {
        from_email_id: this.state.user.email,
        to_email_id: userData.email,
        interaction_type: userData.interactable,
      };
      Vibration.vibrate(300);
      this.server.post('/interaction.json', data)
        .then((res) => {
          let toast = (userData.status === 'active' ? 'Bumping ' : 'Nudging ') + userData.name;
          ToastAndroid.show(toast, ToastAndroid.SHORT, 500);
        })
        .catch((err) => {
          ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
        });
    }
  }

  borderStyle(interactable) {
    if (interactable === 'bump') {
      return {borderLeftColor: '#43ca01'};
    }
    else if (interactable === 'nudge') {
      return {borderLeftColor: '#fdc300'}
    }
    else {
      return {borderLeftColor: 'white'}
    }
  }

  showRow(userData, sectionID, rowID) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.processDoubleTap(userData)}
      >
        <View style={[styles.row, userData.email !== this.state.user.email ? this.borderStyle(userData.interactable) : null ]}>
          <UserView user={userData} rank={parseInt(rowID) + 1}/>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  userList() {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.state.users);
  }


  render() {
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
              <Image style={styles.logo} source={{ uri: 'http://move1t.herokuapp.com/img/logo.png'}} />
              <View style={styles.headerText}>
                <Text style={styles.month}>{this.state.month}</Text>
                <View style={styles.amountSection}>
                  <Text style={styles.monthlyTotalAmount}>₹{this.state.monthly_total_amount}</Text>
                  <Text style={styles.monthlyGoal}> / ₹{this.state.monthly_goal}</Text>
                </View>
              </View>
            </View>
            <ScrollView>
              <ListView
                dataSource={this.userList()}
                renderRow={this.showRow.bind(this)}
                />
            </ScrollView>
            <ActionButton
              buttonColor="rgb(253, 195, 0)"
              onPress={() => this.onPressNewEntry()}
            />
          </View>
        );
      }
    }
  }

  var styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    progressBar: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center'
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
      flex: 0.7
    },
    logo: {
      height: 50,
      width: 50,
      resizeMode: 'contain',
      flex: 0.3
    },
    month: {
      color: '#000',
      fontSize: 18
    },
    amountSection: {
      flexWrap: 'nowrap',
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    monthlyTotalAmount: {
      color: '#000',
      fontSize: 24,
      fontWeight: 'bold'
    },
    monthlyGoal: {
      color: '#BBAA4E',
      fontSize: 13,
      marginBottom: 2
    },
    row: {
      borderLeftWidth: 5,
      flexDirection: 'row',
      padding: 10,
      borderColor: '#F6F6F6',
      borderBottomWidth: 2,
      flex: 100
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    }
  });
