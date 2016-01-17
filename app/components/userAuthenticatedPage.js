'use strict';

var React = require('react-native');
var LoginPage = require('./login/loginPage');
var Constants = require('../constants');

var {
  AsyncStorage,
  Component
} = React;

class UserAuthenticatedPage extends Component {
  componentDidMount() {
    AsyncStorage.getItem(Constants.USER_EMAIL_STORAGE_KEY).then((value) => {
      if(value != null) {
        this.setState({currentUser: {email: value}});
        this._afterCurrentUserAvailable();
      } else {
        this.props.navigator.replace({name: 'Login', component: LoginPage});
      }
    }).done(); //FixIt - Add a catch method
  }

  _afterCurrentUserAvailable() {
    console.log('Nothing to do!');
  }
}

module.exports = UserAuthenticatedPage;
