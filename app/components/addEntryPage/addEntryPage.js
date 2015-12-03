'use strict';

var React = require('react-native');
var Leaderboard = require('../leaderboard/leaderboard');

var {
  StyleSheet,
  Text,
  TextInput,
  DatePickerIOS,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

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
    marginTop: 65,
    alignItems: 'center'
  }
});

class AddEntryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: '0',
      isLoading: false,
      message: ''
    };
  }

  render() {
    console.log('AddEntryPage.render');
    var spinner = this.state.isLoading ?
    (<ActivityIndicatorIOS hidden="true" size="large"/>) :
    (<View />);
    return (
      <View style={styles.container}>
        <View style={styles.flowRight}>
          <Text>Date: </Text>
          <DatePickerIOS
            date={new Date}
            mode="date"
            />
        </View>

        <View style={styles.flowRight}>
          <Text>Duration: </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Minutes"
            keyboardType="numeric"
            value={this.state.duration}
            onChange={this.onDurationChanged.bind(this)}
            />
        </View>

        <TouchableHighlight
          style={styles.button}
          underlayColor='#99d9f4'
          onPress={this.onAddPressed.bind(this)}
          >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
  }

  onDurationChanged(event) {
    console.log('onDurationChanged');
    this.setState({ duration: event.nativeEvent.text });
    console.log(this.state.duration);
  }

  onAddPressed() {
    var data = {
      email: 'USERNAME@multunus.com',
      entry: {
        date: new Date(),
        duration: this.state.duration
      }
    };
    var url = 'http://staging-move1t.herokuapp.com/entries.json';
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
        title: 'Leaderboard',
        component: Leaderboard
    });
  }

}

module.exports = AddEntryPage;
