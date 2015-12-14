'use strict';

var React = require('react-native');
var moment = require('moment');
var Constants = require('../../../constants');
var Leaderboard = require('../leaderboard/leaderboard');
var LoginPage = require('../loginPage/loginPage');
var NavBar = require('../navBar');
var Spinner = require('../spinner');
var formStyles = require('../../styles/formStyles');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  DatePickerIOS,
  AsyncStorage,
  Component,
  Dimensions
} = React;

const DATE_PICKER_HEIGHT = 504;

var styles = StyleSheet.create({
  datePickerContainer: {
    backgroundColor: '#F7F7F7',
    bottom: DATE_PICKER_HEIGHT - Dimensions.get('window').height,
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
  }
});

class AddEntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      duration: '',
      isLoading: false,
      message: '',
      showDatePicker: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(Constants.USER_EMAIL_STORAGE_KEY).then((value) => {
      if(value != null) {
        this.setState({currentUser: {email: value}});
      } else {
        this.props.navigator.replace({name: 'Login Page', component: LoginPage});
      }
    }).done(); //FixIt - Add a catch method
  }

  render() {
    console.log('AddEntryPage.render');
    var datePicker =
      <View
        style={styles.datePickerContainer}>
        <DatePickerIOS
          date={this.state.date}
          maximumDate={new Date()}
          onDateChange={this.onDateChange.bind(this)}
          mode="date"
        />
      </View>;
    return (
      <View>
        <NavBar
          navigator={this.props.navigator}
          title="Add Entry"
          rightButtonText="Cancel"
          rightButtonLink={{name: 'Leaderboard', component: Leaderboard}}
          />
        <View style={formStyles.container}>
          <View style={formStyles.flowRight}>
            <View style={formStyles.labelWrapper}>
              <Text>Date: </Text>
            </View>
            <View style={formStyles.textInputWrapper}>
              <Text
                style={formStyles.textInput}
                onPress={this.onDateFocus.bind(this)}
                >
                {moment(this.state.date).format('D MMMM, YYYY')}
              </Text>
            </View>
          </View>

          <View style={formStyles.flowRight}>
            <View style={formStyles.labelWrapper}>
              <Text>Duration: </Text>
            </View>
            <View style={formStyles.textInputWrapper}>
              <TextInput
                ref="durationTextInput"
                style={formStyles.textInput}
                placeholder="Minutes"
                keyboardType="numeric"
                autoFocus={true}
                value={this.state.duration}
                onChange={this.onDurationChange.bind(this)}
                onFocus={this.onDurationFocus.bind(this)}
                />
            </View>
          </View>

          <TouchableHighlight
            style={formStyles.button}
            underlayColor='#99d9f4'
            onPress={this.onAddPress.bind(this)}
            >
            <Text style={formStyles.buttonText}>Add</Text>
          </TouchableHighlight>

          {this.state.isLoading ? <Spinner /> : <View />}

          <Text style={formStyles.description}>{this.state.message}</Text>
        </View>

        {this.state.showDatePicker ? datePicker : <View />}
      </View>
    );
  }

  onDateFocus() {
    this.refs.durationTextInput.blur();
    this.setState({showDatePicker: true});
  }

  onDateChange(date) {
    this.setState({date: date});
  }

  onDurationFocus() {
    this.setState({showDatePicker: false});
  }

  onDurationChange(event) {
    this.setState({
      duration: event.nativeEvent.text
    });
  }

  onAddPress() {
    var data = {
      email: this.state.currentUser.email,
      entry: {
        date: this.state.date,
        duration: this.state.duration
      }
    };
    var url = Constants.APP_SERVER_HOST + '/entries';
    this._postToUrl(url, data);
  }

  _postToUrl(url, data) {
    this.setState({isLoading: true});
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
      isLoading: false,
      message: error.message
    }));
  }

  _handleResponse(response) {
    this.setState({
      isLoading: false,
      message: ''
    });
    console.log('Response: ' + JSON.stringify(response));
    this.props.navigator.push({
        name: 'Leaderboard',
        component: Leaderboard
    });
  }

}

module.exports = AddEntryPage;
