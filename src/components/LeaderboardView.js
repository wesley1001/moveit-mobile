import moment from 'moment';
import Server from '../services/Server';
import UserView from './UserView';
import User from '../models/User';
import ActionButton from 'react-native-action-button';
import React, { ToastAndroid, AsyncStorage, Component, ScrollView, ListView, View, ProgressBarAndroid, StyleSheet, Image,Text } from 'react-native';

export default class LeaderboardView extends Component {
  constructor(props) {
    super(props);
    let currentMonth = moment().endOf('month').format('MMMM YYYY');
    this.state = { isLoading: false, email: 'muraleekrishna.g@multunus.com', month: currentMonth, users: [] };
    this.server = new Server('http://staging-move1t.herokuapp.com');
  }

  onPressNewEntry() {
    this.props.navigator.replace({name: "Add Entry"});
  }

  delay(time) {
    return new Promise(function (fulfill) {
      setTimeout(fulfill, time);
    });
  }

  getStoredLeaderboard() {
    return AsyncStorage.getItem('LeaderboardData');
  }

  storeData(data) {
    AsyncStorage.setItem('LeaderboardData', JSON.stringify(data));
  }

  getData() {
    let data = {
      email: this.state.email,
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

    this.server.get('/leaderboard.json', data).then((res) => {
        let data = JSON.parse(res.text);
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
    this.reloadLeaderboard();
  }

  showRow(userData, sectionID, rowID) {
    return (
      <View style={styles.row}>
        <UserView user={userData} rank={parseInt(rowID) + 1}/>
      </View>
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
                renderRow={this.showRow}
                />
            </ScrollView>
            <ActionButton buttonColor="rgb(253, 195, 0)">
              <ActionButton.Item buttonColor='#9b59b6' title="New Entry" onPress={() => this.onPressNewEntry()}>
                <Text style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
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
