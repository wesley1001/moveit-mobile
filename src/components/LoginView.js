import Server from '../services/Server';
import User from '../models/User';
import React, { Component, View, ProgressBarAndroid, StyleSheet, ToastAndroid, Text, AsyncStorage, PropTypes } from 'react-native';
import { MKButton, MKTextField } from 'react-native-material-kit';

export default class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      user: {
        email: null,
        name: null,
      },
    };
  }

  successFullyLoggedIn(user) {
    let registerdUser = new User(user);
    this.setState({ user: registerdUser });
    this.saveData().then(() => {
      this.props.navigator.replace({ name: 'Add Entry' });
    });
  }

  sendData() {
    let data = { user: this.state.user };
    this.setState({ isLoading: true });
    Server.post('/users/register.json', data)
      .then((res) => {
        this.successFullyLoggedIn(res.user);
      })
      .catch(() => {
        this.setState({ isLoading: false });
        ToastAndroid.show('Sorry, we couldn\'t connect to the server', ToastAndroid.SHORT, 2000);
      });
  }

  saveData() {
    return AsyncStorage.setItem('UserDetails', JSON.stringify(this.state.user));
  }

  isFormEmpty() {
    return !(this.state.user.name && this.state.user.email);
  }

  onRegister() {
    let userData = { email: this.state.email, name: this.state.name };
    this.setState({ user: new User(userData) });
    if(!this.isFormEmpty()) {
      this.sendData();
    } else {
      ToastAndroid.show('Name and email id is required', ToastAndroid.SHORT, 2000);
    }
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
          <MKTextField
            floatingLabelEnabled
            floatingLabelFont={{ fontSize: 15, fontWeight: '100' }}
            highlightColor="#fdc300"
            keyboardType="default"
            onChangeText={(name) => this.setState({ name })}
            placeholder="Name"
            style={styles.textfieldWithFloatingLabel}
          />
          <MKTextField
            floatingLabelEnabled
            floatingLabelFont={{ fontSize: 15, fontWeight: '100' }}
            highlightColor="#fdc300"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            style={styles.textfieldWithFloatingLabel}
          />

          <MKButton backgroundColor={'#43ca01'}
            onPress={() => this.onRegister()}
            style={styles.register}
          >
            <Text pointerEvents="none"
              style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}
            >
              REGISTER
            </Text>
          </MKButton>
        </View>
      );
    }
  }
}

LoginView.propTypes = {
  navigator: PropTypes.object,
};

const styles = StyleSheet.create({
  textfieldWithFloatingLabel: {
    height: 50,
    margin: 10,
    marginTop: 15,
  },
  progressBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  googleSignIn: {
    height: 38,
    padding: 10,
    margin: 10,
    marginTop: 20,
  },
  register: {
    height: 38,
    padding: 10,
    margin: 10,
  },
});
