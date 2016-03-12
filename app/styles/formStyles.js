'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: '#E6E6E6',
    padding: 5,
    paddingLeft: 30,
    paddingRight: 30
  },
  button: {
    height: 36,
    flex: 1,
    backgroundColor: '#43CA01',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingBottom: 4
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  label: {
    flex: 3,
    fontSize: 15,
    fontWeight: '500'
  },
  textInputWrapper: {
    flex: 8,
  },
  textInput: {
    height: 30,
    padding: 4,
    marginRight: 5,
    fontSize: 14
  },
  multilineTextInput: {
    height: 60,
    marginRight: 5,
    fontSize: 14
  },
  container: {
    paddingTop: 4,
    alignItems: 'center'
  }
});
