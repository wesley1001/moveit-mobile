import Server from '../../services/Server';
import User from '../../models/User';

import Dropdown from 'react-native-dropdown-android';
import moment from 'moment';
import ProfileEntryView from './ProfileEntryView.js';
import React, {  Picker, ToastAndroid, AsyncStorage, Component, ScrollView, ListView, View, ProgressBarAndroid, StyleSheet, Image, Text } from 'react-native';

export default class ProfileView extends Component {
  constructor(props) {
    super(props);
    let currentMonth = moment().endOf('month').format('MMMM YYYY');
    this.state = {
      selected: 0,
      isLoading: false,
			month: moment().format("MMMM YYYY"),
			entries: [],
			user: new User({}),
			totalAmount: 0,
			totalDuration: 0
    };
  }

  onPressNewEntry() {
    this.props.navigator.replace({name: "Add Entry"});
  }

  getData(data) {
    this.setState({ isLoading: true, month: data.value, selected: data.selected });
    let params = {
      email: this.state.user.email,
      month: data.month || this.state.month
    };
      Server.get('/monthly_summary.json', params).then((data) => {
          let monthlySummary = data.user.monthly_summary;
  				let totalDuration = monthlySummary.reduce((prev, curr, index) => { return { duration: prev.duration + curr.duration }} ).duration
  				let totalAmount = monthlySummary.reduce((prev, curr, index) => { return { amount_contributed: prev.amount_contributed + curr.amount_contributed }} ).amount_contributed
          this.setState({ isLoading: false,
                        totalDuration: totalDuration,
                        totalAmount: totalAmount,
  											entries: monthlySummary
                      });
          }).catch((err) => {
            this.setState({ isLoading: false });
            ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
          });
  }


  componentDidMount() {
    let globalState = this.props.globalState;
    AsyncStorage.getItem('UserDetails')
      .then((userData) => {
        let appUser = new User(JSON.parse(userData));
        let user =  globalState && globalState.userProfile ? this.props.globalState.userProfile : appUser;
        this.setState({ user: user });
			  this.getData({data: {value: moment().format("MMMM YYYY"), selected: 0}});
      })
      .catch(() => {
        this.props.navigator.replace({ name: 'Login' });
      })
      .finally(() => {
        this.props.setGlobalState({ userProfile: null });
      });
  }

  showRow(entry, sectionID, rowID) {
    return ( <ProfileEntryView entry={entry}/> );
  }

  entryList() {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.state.entries);
  }

  renderMonthList() {
    const startingDate = moment([2015, 3]);
    const date = startingDate;
    const endingDate = moment();
    const options = [];
    while (date.isBefore(endingDate)) {
      options.unshift(date.format("MMM YY"));
      startingDate.add(1, 'months')
    }
    return options;
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
            <Image style={styles.background} source={{ uri: 'http://move1t.herokuapp.com/img/profile_background02.jpg' }}>
              <Image  style={styles.thumb} source={{ uri: this.state.user.gravatar + '&s=250&d=mm'}} />
              <View style={styles.userDetails}>
                <Text style={styles.name}>{this.state.user.name}</Text>
              </View>
            </Image>
            <View style={styles.header}>
              <View style={styles.amountSection}>
                <Text style={styles.value}>
									₹{this.state.totalAmount}
                </Text>
                <Text style={styles.label}>
									CONTRIBUTED
                </Text>
              </View>
							<View style={styles.durationSection}>
                <Text style={styles.value}>
									{this.state.totalDuration} mins
                </Text>
                <Text style={styles.label}>
									WORKED OUT
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center'}}>
              <Dropdown
                style={{ height: 20, width: 120 }}
                values={this.renderMonthList()}
                selected={this.state.selected} onChange={(data) => { this.getData(data); }} />
            </View>

						<ScrollView>
	            <ListView
	              dataSource={this.entryList()}
	              renderRow={this.showRow}
	              />
	          </ScrollView>
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
		background: {
      flexDirection: 'column',
      height: 150,
			justifyContent: 'flex-start',
			alignItems: 'center'
		},
		thumb: {
	    height: 150,
	    width: 150,
	    flex: 0.6,
			marginTop: 20,
	    resizeMode: 'contain',
	    borderRadius: 1000
	  },
    userDetails: {
			marginTop: 20,
      flexDirection: 'column',
      flex: 0.4,
			alignItems: 'center'
    },
		name: {
			fontWeight: 'bold',
			color: '#54503F',
			fontSize: 21
		},
    month: {
      color: '#000',
      fontSize: 18
    },
		header: {
			flexDirection: 'row',
			height: 70,
			borderBottomWidth: 1,
			borderBottomColor: '#E8E8E8'
		},
		amountSection: {
			flexDirection: 'column',
			flex: 0.5,
			borderRightWidth: 1,
			borderRightColor: '#D7D7D7',
			justifyContent: 'center',
			alignItems: 'center'
		},
		durationSection: {
			flex: 0.5,
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center'
		},
		value: {
			color: '#575757',
			fontWeight: 'bold',
			fontSize: 18
		},
		label: {
			color: '#575757'
		},
    row: {
			backgroundColor: '#FAFAFA',
	    flexDirection: 'row',
	    padding: 10,
	    borderWidth: 1,
	    borderColor: '#F6F6F6',
	    borderBottomWidth: 2,
	    borderRadius: 2,
	    margin: 10,
	    marginLeft: 15,
	    marginRight: 15,
			justifyContent: 'space-between',
	    borderBottomColor: '#E0E0E0',
			flex: 1
    },
		entryColumn: {
			alignItems: 'stretch'
		},
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
    picker: {
      width: 100,
    },
  });
