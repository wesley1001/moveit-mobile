'use strict';

var React = require('react-native');
var SessionManager = require('../../sessionManager');
var AddEntryPage = require('../addEntry/addEntryPage');
var NavBar = require('../navBar');
var Spinner = require('../spinner');
var formStyles = require('../../styles/formStyles');

var {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Component
} = React;

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      message: ''
    };
  }

  render() {
    return (
      <View>
        <NavBar title="Login" />
        <View style={formStyles.container}>
          <View style={formStyles.fieldContainer}>
            <Text style={formStyles.label}>Name: </Text>
            <View style={formStyles.textInputWrapper}>
              <TextInput
                style={formStyles.textInput}
                placeholder="Your name here"
                autoFocus={true }
                autoCorrect={false}
                value={this.state.name}
                onChange={this.onNameChange.bind(this)}
                />
            </View>
          </View>

          <View style={formStyles.fieldContainer}>
            <Text style={formStyles.label}>Email: </Text>
            <View style={formStyles.textInputWrapper}>
              <TextInput
                style={formStyles.textInput}
                placeholder="username@multunus.com"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={this.state.email}
                onChange={this.onEmailChange.bind(this)}
                />
            </View>
          </View>

          <View style={[formStyles.fieldContainer, {borderBottomWidth: 0}]}>
            <TouchableHighlight
              style={formStyles.button}
              underlayColor='#99d9f4'
              onPress={this.onLoginPress.bind(this)}
              >
              <Text style={formStyles.buttonText}>Login</Text>
            </TouchableHighlight>
          </View>
          {this.state.isLoading ? <Spinner /> : <View />}

          <Text style={formStyles.description}>{this.state.message}</Text>
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
    this.setState({isLoading: true});
    SessionManager.login({
      name: this.state.name,
      email: this.state.email
    })
    .then(() => this._goToAddEntryPage())
    .catch(error => this.setState({
      isLoading: false,
      message: error.message
    }));
  }

  _goToAddEntryPage() {
    this.props.navigator.push({
      name: 'Add Entry',
      component: AddEntryPage
    });
  }

}

module.exports = LoginPage;
