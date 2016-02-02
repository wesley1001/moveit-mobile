'use strict';

var React = require('react-native');
var moment = require('moment');
var MainPage = require('../mainPage');
var UserAuthenticatedPage = require('../userAuthenticatedPage');
var NavBar = require('../navBar');
var Spinner = require('../spinner');
var DatePicker = require('./datePicker');
var formStyles = require('../../styles/formStyles');
import URLBuilder from '../../urlBuilder';

var {
  Text,
  TextInput,
  View,
  TouchableHighlight
} = React;

class AddEntryPage extends UserAuthenticatedPage {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      duration: '',
      description: '',
      isLoading: false,
      message: '',
      showDatePicker: false
    };
  }

  render() {
    console.log('AddEntryPage.render');
    var datePicker =
      <DatePicker
        date={this.state.date}
        onDateChange={this.onDateChange.bind(this)}
        onDone={this.focusDurationField.bind(this)}
        />;
    return (
      <View style={{flex: 1}}>
        <NavBar
          navigator={this.props.navigator}
          title="Add Entry"
          rightButton={require('../../img/cancel.png')}
          rightButtonLink={{name: 'Main Page', component: MainPage}}
          />
        <View style={formStyles.container}>
          <View style={formStyles.fieldContainer}>
            <Text style={formStyles.label}>Date</Text>
            <View style={formStyles.textInputWrapper}>
              <Text
                style={formStyles.textInput}
                onPress={this.onDateFocus.bind(this)}
                >
                {moment(this.state.date).format('D MMMM, YYYY')}
              </Text>
            </View>
          </View>

          <View style={formStyles.fieldContainer}>
            <Text style={formStyles.label}>Duration</Text>
            <View style={formStyles.textInputWrapper}>
              <TextInput
                ref="durationTextInput"
                style={formStyles.textInput}
                placeholder="Minutes"
                keyboardType="numeric"
                autoFocus={true}
                value={this.state.duration}
                onChange={this.onDurationChange.bind(this)}
                onFocus={this.hideDatePicker.bind(this)}
                />
            </View>
          </View>

          <View style={formStyles.fieldContainer}>
            <View style={formStyles.textInputWrapper}>
              <TextInput
                ref="descriptionTextInput"
                style={formStyles.multilineTextInput}
                placeholder="Brief description of workout"
                multiline={true}
                autoCorrect={true}
                value={this.state.description}
                onChange={this.onDescriptionChange.bind(this)}
                onFocus={this.hideDatePicker.bind(this)}
                />
            </View>
          </View>

          <View style={[formStyles.fieldContainer, {borderBottomWidth: 0}]}>
            <TouchableHighlight
              style={formStyles.button}
              underlayColor='#99d9f4'
              onPress={this.submitForm.bind(this)}
              >
              <Text style={formStyles.buttonText}>Add</Text>
            </TouchableHighlight>
          </View>
          {this.state.isLoading ? <Spinner /> : <View />}

          <Text style={formStyles.description}>{this.state.message}</Text>
        </View>

        {this.state.showDatePicker ? datePicker : <View />}
      </View>
    );
  }

  onDateFocus() {
    this.refs.durationTextInput.blur();
    this.refs.descriptionTextInput.blur();
    this.setState({showDatePicker: true});
  }

  focusDurationField() {
    this.refs.durationTextInput.focus();
  }

  onDateChange(date) {
    this.setState({date: date});
  }

  hideDatePicker() {
    this.setState({showDatePicker: false});
  }

  onDurationChange(event) {
    this.setState({
      duration: event.nativeEvent.text
    });
  }

  onDescriptionChange(event) {
    this.setState({
      description: event.nativeEvent.text
    });
  }

  submitForm() {
    var data = {
      email: this.state.currentUser.email,
      entry: {
        date: this.state.date,
        duration: this.state.duration,
        description: this.state.description
      }
    };
    this._postToUrl(URLBuilder.entriesURL(), data);
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
    }))
    .done();
  }

  _handleResponse(response) {
    this.setState({
      isLoading: false,
      message: ''
    });
    console.log('Response: ' + JSON.stringify(response));
    this.props.navigator.push({
        name: 'Main Page',
        component: MainPage
    });
  }

}

module.exports = AddEntryPage;
