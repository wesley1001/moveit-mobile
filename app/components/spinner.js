'use strict';

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  Component
} = React;

class Spinner extends Component {
  render() {
    return (
      <ActivityIndicatorIOS
        hidden="true"
        size="large"
        style={{marginTop: 20}}
        />
    );
  }
}

module.exports = Spinner;
