import Server from '../services/Server'
import User from '../models/User'
import React, { Component, View, ProgressBarAndroid, StyleSheet, ToastAndroid, Text, AsyncStorage } from 'react-native';
import MK, { MKButton, MKTextField } from 'react-native-material-kit';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: {
        email: null,
        name: null
      }
    };
    this.server = new Server('http://staging-move1t.herokuapp.com');
  }

  sendData() {
    let data = { user: this.state.user };

    this.server.post('/users/register.json', data)
      .then((res) => {
          let registerdUser = new User(res.user);
          this.setState({ isLoading: false, user: registerdUser });
          this.saveData().then(() => {
            this.props.navigator.replace({ name: 'Add Entry' });
          });
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
      });
  }

  saveData() {
    return AsyncStorage.setItem('UserDetails', JSON.stringify(this.state.user))
  }

  isFormEmpty() {
    return !(this.state.user.name && this.state.user.email);
  }

  onRegister() {
    let userData = { email: this.state.email, name: this.state.name }
    this.setState({user: new User(userData)})
    if(!this.isFormEmpty()) {
      this.setState({ isLoading: true });
      this.sendData();
    } else {
      ToastAndroid.show('Name and email id is required', ToastAndroid.SHORT, 2000)
    }
  }
  componentDidMount() {
    this.refs.name.focus();
  }

  render() {
      return (
        <View>
          <MKTextField
            floatingLabelEnabled={true}
            highlightColor="#fdc300"
            floatingLabelFont={{ fontSize: 15, fontWeight: '100' }}
            keyboardType='default'
            onChangeText={(name) => this.setState({ name: name })}
            placeholder='Name'
            style={styles.textfieldWithFloatingLabel}
          />
          <MKTextField
            floatingLabelEnabled={true}
            highlightColor="#fdc300"
            floatingLabelFont={{ fontSize: 15, fontWeight: '100' }}
            keyboardType='email-address'
            onChangeText={(email) => this.setState({ email: email })}
            placeholder='Email'
            style={styles.textfieldWithFloatingLabel}
          />

          <MKButton
            backgroundColor={'#43ca01'}
            style={{height: 38, padding: 10, margin: 10}}
            onPress={() => this.onRegister()}
          >
            <Text pointerEvents="none"
              style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              REGISTER
            </Text>
          </MKButton>

        </View>
      );
    }
  }

let styles = StyleSheet.create({
  textfieldWithFloatingLabel: {
    height: 50,
    margin: 10,
    marginTop: 15
  },
  progressBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});
