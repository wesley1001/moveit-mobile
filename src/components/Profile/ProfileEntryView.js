import moment from 'moment';
import React, { Component, View, StyleSheet, Text, TouchableNativeFeedback, PropTypes } from 'react-native';

export default class ProfileEntryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDescription: false,
    };
  }

  handleTouch() {
    this.setState({ showDescription: !this.state.showDescription });
  }

  render() {
    const description = this.state.showDescription ? (<View style={{ padding: 5 }}><Text style={styles.description}>{this.props.entry.description}</Text></View>) : null;
    return (
      <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => this.handleTouch()}
      >
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Text style={styles.entryColumn}>{moment(this.props.entry.date).format('MMMM D')}</Text>
            <Text style={styles.entryColumn}>{this.props.entry.duration} mins</Text>
            <Text style={styles.entryColumn}>₹{this.props.entry.amount_contributed}</Text>
          </View>
          {description}
        </View>
      </TouchableNativeFeedback>
    );
  }
}

ProfileEntryView.propTypes  = {
  entry: PropTypes.object,
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#F6F6F6',
    borderBottomWidth: 2,
    borderRadius: 2,
    padding: 10,
    margin: 10,
    marginLeft: 15,
    marginRight: 15,
    borderBottomColor: '#E0E0E0',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  entryColumn: {
    alignItems: 'stretch',
  },
  description: {
    flex: 0.1,
    color: '#424242',
    justifyContent: 'flex-end',
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 10,
    flexWrap: 'wrap',
  },
});
