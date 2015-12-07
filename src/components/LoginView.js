import Server from '../services/Server';
import User from '../models/User';
import React, { DeviceEventEmitter, Component, View, ProgressBarAndroid, StyleSheet, ToastAndroid, Text, AsyncStorage } from 'react-native';
import MK, { MKButton, MKTextField } from 'react-native-material-kit';
import GoogleSignin from 'react-native-google-signin';

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
    this.server.post('/users/register.json', data)
      .then((res) => {
          this.successFullyLoggedIn(res.user);
      })
      .catch((err) => {
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

  componentDidMount() {
    GoogleSignin.init();
  }

  onGoogleSignIn() {
    DeviceEventEmitter.addListener('googleSignIn', (user) => {
      this.setState({ user: user });
      this.sendData();
    });
    DeviceEventEmitter.addListener('googleSignInError', (error) => {
      ToastAndroid.show('Login using google failed', ToastAndroid.SHORT, 2000);
    });
    GoogleSignin.signIn();
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

          <MKButton backgroundColor={'#43ca01'} style={styles.register} onPress={() => this.onRegister()} >
            <Text pointerEvents="none"
              style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              REGISTER
            </Text>
          </MKButton>

          <View style={styles.seperator}></View>

          <MKButton
            backgroundColor={'#D7564A'}
            style={styles.googleSignIn}
            onPress={() => this.onGoogleSignIn()}
            >
            <Text pointerEvents="none"
              style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
              Sign in with Google
            </Text>
          </MKButton>
        </View>
      );
    }
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
  googleSignIn: {
    height: 38,
    padding: 10,
    margin: 10,
    marginTop: 20
  },
  register: {
    height: 38,
    padding: 10,
    margin: 10
  },
  seperator: {
    flex : 0.8,
    margin: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    alignItems: 'center'
  },
  progressBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
