'use strict';

var React = require('react-native');
var moment = require('moment');

var {
  StyleSheet,
  View,
  ListView,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#F6F6F6'
  },
  column: {
    flex: 1,
    padding: 15,
    alignItems: 'center'
  },
  listItemFont: {
    fontSize: 18
  }
});

class MonthlySummaryList extends Component {
  render() {
    return (
      <ListView
        dataSource={this.props.listItems}
        renderRow={this.renderItem.bind(this)}
        automaticallyAdjustContentInsets={false}
      />
    );
  }

  renderItem(listItem, sectionID, rowID) {
    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.listItemFont}>{moment(listItem.date).format('MMM D')}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.listItemFont}>₹{listItem.amount_contributed}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.listItemFont}>{listItem.duration} min</Text>
        </View>
      </View>
    );
  }
}

module.exports = MonthlySummaryList;
