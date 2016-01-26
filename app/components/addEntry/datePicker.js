'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  DatePickerIOS,
  Dimensions,
  Component
} = React;

var styles = StyleSheet.create({
  datePickerContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'column',
    width: Dimensions.get('window').width
  },
  datePickerTopBar: {
    backgroundColor: '#F7F7F7',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#ADADAD',
    borderBottomColor: '#bbc2c9',
    flex: 1,
    padding: 10,
    alignItems: 'flex-end',
    paddingRight: 10
  },
  doneButton: {
    fontSize: 17,
    fontWeight: '600'
  },
  datePicker: {
    flex: 1,
    backgroundColor: '#D2D5DB',
    alignItems: 'center'
  }
});

class DatepPicker extends Component {
  render() {
    return(
      <View
        style={styles.datePickerContainer}>
        <View style={styles.datePickerTopBar}>
          <Text
            style={styles.doneButton}
            onPress={this.props.onDone}
            >
            Done
          </Text>
        </View>
        <DatePickerIOS
          style={styles.datePicker}
          date={this.props.date}
          maximumDate={new Date()}
          onDateChange={this.props.onDateChange}
          mode="date"
        />
      </View>
    );
  }
}

module.exports = DatepPicker;
