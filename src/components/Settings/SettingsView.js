import React, { Component, Text, View, StyleSheet, ToastAndroid } from 'react-native';
import { MKButton } from 'react-native-material-kit';
import codePush from 'react-native-code-push';

export default class SettingsView extends Component {

  handlePress() {
    codePush.sync({ updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE }, (status) => {
      let toast;
      switch (status) {
        case codePush.SyncStatus.UP_TO_DATE:
          toast = 'App is already up to date';
          ToastAndroid.show(toast, ToastAndroid.SHORT, 500);
        break;
        case codePush.SyncStatus.UNKNOWN_ERROR:
          toast = 'Could not connect to server';
          ToastAndroid.show(toast, ToastAndroid.SHORT, 500);
        break;
      }
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <MKButton
          backgroundColor={'#43ca01'}
          style={styles.saveButton}
          onPress={() => this.handlePress()}
        >
          <Text pointerEvents="none"
            style={styles.saveButtonText}>
            Check for Updates
          </Text>
        </MKButton>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 15,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  saveButton: {
    height: 38,
    padding: 10,
    marginTop: 35
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
