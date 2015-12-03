import moment from 'moment';
import Server from '../services/Server'
import React, { Component, Text, View, ProgressBarAndroid, NativeModules, StyleSheet, ToastAndroid } from 'react-native';
import MK, { MKButton, MKTextField } from 'react-native-material-kit';
import rnGeolocation from 'rn-geolocation';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      duration: '',
      date: moment().format('YYYY-MM-DD'),
      description: '',
      location: {
        longitude: null,
        latitude: null
      }
    };
    this.server = new Server('http://staging-move1t.herokuapp.com');
  }

  sendData() {
    let data = {
      email: this.state.email,
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
    console.log(data);
    this.server.post('/entries.json', data)
      .then(() => {
         this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
      });
      }
    );
  }

  componentDidMount() {
    rnGeolocation.getCurrentPosition((location) => {
        this.setState({ location: { longitude: location.coords.longitude, latitude: location.coords.latitude }});
    },() => {}, { timeout: 5000, enableHighAccuracy: true, maximumAge: 10000 });
  }

  onSave() {
    this.setState({ isLoading: true });
    this.sendData();
  }

  handleDateClick() {
    var self = this;
    NativeModules.DateAndroid.showDatepicker(function() {}, function(year,month,day) {
      month += 1;
      let newdate = year + '-' + month + '-' +day;
      self.setState({date: newdate});
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
          <View>
            <Text onPress={(event) => this.handleDateClick()}>
              Date: {this.state.date}
            </Text>
            <MKTextField
              floatingLabelEnabled={true}
              floatingLabelFont={{fontSize: 15, fontWeight:'100'}}
              keyboardType='email-address'
              onChangeText={(email) => this.setState({email})}
              placeholder='Email'
              value={this.state.email}
              style={styles.textfieldWithFloatingLabel}
            />
            <MKTextField
              floatingLabelEnabled={true}
              floatingLabelFont={{fontSize: 15, fontWeight:'100'}}
              keyboardType='numeric'
              onChangeText={(duration) => this.setState({duration})}
              placeholder='Duration of workout in minutes:'
              value={this.state.duration}
              style={styles.textfieldWithFloatingLabel}
            />
            <MKTextField
              floatingLabelEnabled={true}
              floatingLabelFont={{fontSize: 10, fontWeight:'100'}}
              keyboardType='default'
              onChangeText={(description) => this.setState({description})}
              placeholder='Brief description:'
              value={this.state.description}
              style={styles.textfieldWithFloatingLabel}
            />

            <MKButton
              backgroundColor={'#43ca01'}
              style={{height: 38, padding: 10, margin: 10}}
              onPress={() => this.onSave()}
            >
              <Text pointerEvents="none"
                style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                SAVE
              </Text>
            </MKButton>

          </View>
        );
      }
    }
  }

let styles = StyleSheet.create({
  textfieldWithFloatingLabel: {
    height: 50,
    marginTop: 10,
  },
  progressBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});
