import moment from 'moment';
import Server from '../services/Server';
import User from '../models/User';
import React, { AsyncStorage, Component, Text, View, ProgressBarAndroid, NativeModules, StyleSheet, ToastAndroid } from 'react-native';
import MK, {  MKButton, MKTextField } from 'react-native-material-kit';
import rnGeolocation from 'rn-geolocation';

export default class EntryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      duration: '',
      date: moment(),
      description: '',
      location: {
        longitude: null,
        latitude: null
      }
    };
    this.server = new Server('http://staging-move1t.herokuapp.com');
  }

  componentWillMount() {
    AsyncStorage.getItem('UserDetails').then((userData) => {
      this.setState({ user: new User(JSON.parse(userData)) });
    })
    .catch(() => {
      this.props.navigator.replace({ name: 'Login' });
    });
  }

  sendData() {
    let data = {
      email: this.state.user.email,
      entry: {
        duration: this.state.duration,
        date: this.state.date.format('YYYY-MM-DD'),
        description: this.state.description
      },
      location: {
        longitude: this.state.location.longitude,
        latitude: this.state.location.latitude
      }
    };
    this.server.post('/entries.json', data)
      .then(() => {
         this.setState({ isLoading: false });
         this.props.navigator.replace({name: 'Leaderboard'});
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
      });
  }

  componentDidMount() {
    rnGeolocation.getCurrentPosition((location) => {
        this.setState({ location: { longitude: location.coords.longitude, latitude: location.coords.latitude }});
    },() => {}, { timeout: 5000, enableHighAccuracy: true, maximumAge: 10000 });
  }

  isFormValid() {
    return this.state.date && this.state.user && this.state.duration;
  }

  onSave() {
    if(this.isFormValid()){
      this.setState({ isLoading: true });
      this.sendData();
    } else {
      ToastAndroid.show('Please enter you workout details', ToastAndroid.SHORT, 2000);
    }
  }

  handleDateClick() {
    var self = this;
    NativeModules.DateAndroid.showDatepicker(function() {}, function(year,month,day) {
      let newdate = moment({ year: year, month: month, day: day});
      self.setState({ date: newdate });
    });
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
            <MKTextField
              highlightColor="#fdc300"
              floatingLabelEnabled={true}
              keyboardType='numeric'
              onChangeText={(duration) => this.setState({duration})}
              placeholder='Duration of workout in minutes'
              value={this.state.duration}
              style={styles.textfieldWithFloatingLabel}
            />
            <MKTextField
              highlightColor="#fdc300"
              floatingLabelEnabled={true}
              keyboardType='default'
              onChangeText={(description) => this.setState({description})}
              placeholder='Brief description:'
              value={this.state.description}
              style={styles.textfieldWithFloatingLabel}
            />

            <MKButton
              backgroundColor={'#43ca01'}
              style={styles.saveButton}
              onPress={() => this.onSave()}
            >
              <Text pointerEvents="none"
                style={styles.saveButtonText}>
                SAVE
              </Text>
            </MKButton>

          </View>
        );
      }
    }
  }

let styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 15
  },
  textfieldWithFloatingLabel: {
    height: 50,
    marginTop: 10,
  },
  progressBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  floatingLabel: {
    fontSize: 15,
    fontWeight:'100'
  },
  saveButton: {
    height: 38,
    padding: 10,
    marginTop: 35
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dateText: {
    fontSize: 15,
    fontWeight:'500'
  }
});
