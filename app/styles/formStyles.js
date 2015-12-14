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
  labelWrapper: {
    flex: 3
  },
  label: {
    fontSize: 15,
    fontWeight: '400'
  },
  textInputWrapper: {
    borderBottomWidth: 1,
    flex: 8,
  },
  textInput: {
    height: 30,
    padding: 4,
    marginRight: 5,
    fontSize: 14
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '43CA01',
    borderColor: '#43CA01',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    paddingBottom: 4
  },
  container: {
    padding: 30,
    alignItems: 'center'
  }
});
