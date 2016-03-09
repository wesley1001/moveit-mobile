import moment from 'moment';
import Server from '../services/Server';
import User from '../models/User';
import React, { AsyncStorage, DatePickerAndroid, Component, Text, TextInput, View, ProgressBarAndroid, StyleSheet, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import MK, {  MKButton, MKTextField } from 'react-native-material-kit';

export default class EntryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      duration: '',
      date: moment().format('YYYY-MM-DD'),
      description: '',
      location: {
        longitude: null,
        latitude: null
      }
    };
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
        date: this.state.date,
        description: this.state.description
      },
      location: {
        longitude: this.state.location.longitude,
        latitude: this.state.location.latitude
      }
    };
    Server.post('/entries.json', data)
      .then((res) => {
         this.setState({ isLoading: false });
         this.props.navigator.replace({name: 'Leaderboard', amountContributed: res.amount_contributed});
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
      });
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

  async showDatePicker(stateKey, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
        var date = new Date(year, month, day);
        newState[stateKey + 'Text'] = moment(date).format('YYYY-MM-DD');
        newState[stateKey + 'Date'] = date;
      this.setState({date: newState.simpleText});
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
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
            <TouchableWithoutFeedback
              onPress={this.showDatePicker.bind(this, 'simple', {date: new Date()})}>
              <Text style={styles.text}>
                Date: {this.state.date}
              </Text>
            </TouchableWithoutFeedback>
            <TextInput
              underlineColorAndroid="#fdc300"
              keyboardType='numeric'
              onChangeText={(duration) => this.setState({duration})}
              placeholder='Duration of workout in minutes'
              value={this.state.duration}
              style={styles.textfieldWithFloatingLabel}
              />
            <TextInput
              underlineColorAndroid="#fdc300"
              multiline={true}
              keyboardType='default'
              onChangeText={(description) => this.setState({description})}
              placeholder='Brief description:'
              value={this.state.description}
              numberOfLines={4}
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
  textfield: {
    height: 30,
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
