import React, { ToastAndroid, Image, Component, Text, View, TouchableHighlight, ProgressBarAndroid, StyleSheet, AsyncStorage, ScrollView, ListView } from 'react-native';
import ActionButton from 'react-native-action-button';

import Server from '../../services/Server';
import Activity from '../../models/Activity';
import ActivityView from './ActivityView';

export default class TimelineView extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, activities: [], email: '' };
    this.server = new Server('http://staging-move1t.herokuapp.com');
  }

  componentDidMount() {
    AsyncStorage.getItem('UserDetails').then((userData) => {
      let email = JSON.parse(userData).email;
      this.setState({ email: email });
      this.getData();
    }).catch(() => {
      this.props.navigator.replace({ name: 'Login' });
    });
  }

  onPressNewEntry() {
    this.props.navigator.replace({name: "Add Entry"});
  }

  getStoredTimeline() {
    return AsyncStorage.getItem('TimelineData');
  }

  storeData(data) {
    AsyncStorage.setItem('TimelineData', JSON.stringify(data));
  }

  getData() {
    let data = { email : this.state.email };
    this.getStoredTimeline().then((storeTimelineData) => {
      let timelineData = JSON.parse(storeTimelineData);
      let activityList = timelineData.map((activity) => new Activity(activity));
      console.log(activityList);
      this.setState({ activities: activities });
    });
    this.setState({ isLoading: true });
    this.server.get('/timeline_feed.json', data)
      .then((data) => {
        let timelineActivities = data.timeline_activities;
        let activities = timelineActivities.map((activity) => new Activity(activity));
        this.storeData(activities);
        this.setState({ activities: activities, isLoading: false });
        })
      .catch((err) => {
          this.setState({ isLoading: false });
          ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
      });
  }

  activityList() {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.state.activities);
  }

  showRow(activity, sectionID, rowID) {

    return (
      <View style={styles.row} key={rowID}>
        <ActivityView activity={activity}/>
      </View>
    )
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
          <ScrollView>
            <ListView
              dataSource={this.activityList()}
              renderRow={this.showRow}
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

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  progressBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  row: {
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: '#F6F6F6',
    borderBottomWidth: 2,
    borderRadius: 2,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#E0E0E0'
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  }
});
