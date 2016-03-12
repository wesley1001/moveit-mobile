'use strict';

var React = require('react-native');
var LoginPage = require('./login/loginPage');
var SessionManager = require('../sessionManager');

class UserAuthenticatedPage extends React.Component {
  componentWillMount() {
    SessionManager.getCurrentUser()
    .then(currentUser => {
      this.setState({currentUser: currentUser});
      this._afterCurrentUserAvailable();
    })
    .catch(() => this.props.navigator.replace({
      name: 'Login', component: LoginPage
    }));
  }

  _afterCurrentUserAvailable() {
    console.log('Nothing to do!');
  }
}

module.exports = UserAuthenticatedPage;
