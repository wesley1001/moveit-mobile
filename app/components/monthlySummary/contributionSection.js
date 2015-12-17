'use strict';

var React = require('react-native');
var moment = require('moment');

var {
  StyleSheet,
  View,
  Text,
  Component
} = React;


var styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#575757',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#BDBDBD',
    borderBottomWidth: 1
  },
  section: {
    flex: 1,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderColor: '#BDBDBD'
  },
  borderRight: {
    borderRightWidth: 1
  },
  value: {
    fontSize: 15,
    color: '#575757',
    fontWeight: '500'
  },
  label: {
    padding: 4,
    fontSize: 11,
    color: '#575757'
  }
});

class ContributionSection extends Component {
  render() {
    var monthYear = moment.monthsShort(this.props.month) + ' ' + this.props.year;
    return (
      <View style={styles.container}>
        <View style={[styles.section, styles.borderRight]}>
          <Text style={styles.value}>{monthYear}</Text>
        </View>
        <View style={[styles.section, styles.borderRight]}>
          <Text style={styles.value}>₹{this.props.totalContribution}</Text>
          <Text style={styles.label}>CONTRIBUTED</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.value}>{this.props.totalDuration} min</Text>
          <Text style={styles.label}>WORKED OUT</Text>
        </View>
      </View>
    );
  }
}

module.exports = ContributionSection;
