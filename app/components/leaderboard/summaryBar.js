'use strict';

var React = require('react-native');
var moment = require('moment');
var {
  StyleSheet,
  Image,
  View,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  summaryBar: {
    flexDirection: 'row',
    backgroundColor: '#FEE66C',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    flex: 1
  },
  logo: {
    height: 40,
    width: 40
  },
  summary: {
    flex: 4
  },
  amounts: {
    flexDirection: 'row',
    fontWeight: 'bold',
    alignItems: 'flex-end'
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  goalAmount: {
    fontSize: 12,
    alignSelf: 'center'
  }
});

class SummaryBar extends Component {
  render() {
    return(
      <View style={styles.summaryBar}>
        <View style={styles.logoContainer}>
          <Image
          style={styles.logo}
          source={require('../../img/multunus_logo.png')}
          />
        </View>
        <View style={styles.summary}>
          <Text>{this._getMonthYear()}</Text>
          <View style={styles.amounts}>
            <Text style={styles.totalAmount}>₹{this.props.totalAmount}</Text>
            <Text style={styles.goalAmount}> / ₹{this.props.goalAmount}</Text>
          </View>
        </View>
      </View>
    );
  }

  _getMonthYear() {
    var month = moment.months(this.props.month);
    var year = this.props.year;
    return month + ' ' + year;
  }
}

module.exports = SummaryBar;
