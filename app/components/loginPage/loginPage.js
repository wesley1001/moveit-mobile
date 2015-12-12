'use strict';

var React = require('react-native');
var Constants = require('../../../constants');
var AddEntryPage = require('../addEntryPage/addEntryPage');
var NavBar = require('../navBar');

var {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
  Component
} = React;

//FixIt - Duplicated in AddEntryPage
var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 15
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  textInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '43CA01',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  container: {
    padding: 30,
    alignItems: 'center'
  }
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: ''
    };
  }

  render() {
    var spinner = this.state.isLoading ?
    (<ActivityIndicatorIOS hidden="true" size="large"/>) :
    (<View />);
    return (
      <View>
        <NavBar title="Login" />
        <View style={styles.container}>
          <View style={styles.flowRight}>
            <Text>Name: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Your name here"
              autoFocus={true }
              autoCorrect={false}
              value={this.state.name}
              onChange={this.onNameChange.bind(this)}
              />
          </View>

          <View style={styles.flowRight}>
            <Text>Email: </Text>
            <TextInput
              style={styles.textInput}
              placeholder="username@multunus.com"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={this.state.email}
              onChange={this.onEmailChange.bind(this)}
              />
          </View>

          <TouchableHighlight
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onLoginPress.bind(this)}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
          {spinner}
          <Text style={styles.description}>{this.state.message}</Text>
        </View>

      </View>
    );
  }

  onNameChange(event) {
    this.setState({
      name: event.nativeEvent.text
    });
  }

  onEmailChange(event) {
    this.setState({
      email: event.nativeEvent.text
    });
  }
  onLoginPress() {
    var data = {
      user: {
        name: this.state.name,
        email: this.state.email
      }
    };
    var url = Constants.APP_SERVER_HOST + '/users/register';
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
    .then(response => {
      this._handleResponse(response);
    })
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
    this._setCurrentUser(response.user.email);
    this._goToAddEntryPage();
  }

  _setCurrentUser(email) {
    AsyncStorage.setItem(Constants.USER_EMAIL_STORAGE_KEY, email);
  }

  _goToAddEntryPage() {
    this.props.navigator.push({
      name: 'Add Entry',
      component: AddEntryPage
    });
  }

}

module.exports = LoginPage;
