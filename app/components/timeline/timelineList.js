'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  ListView,
  Text,
  Image,
  Component
} = React;

var styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
    padding: 15
  },
  row: {
    flexDirection: 'row'
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  activity: {
    flex: 5
  },
  majorText: {
    paddingTop: 2.5,
    paddingBottom: 2.5
  },
  name: {
    fontWeight: '500'
  },
  minorText: {
    fontSize: 13,
    color: '#797979'
  },
  description: {
    flex: 1,
    paddingTop: 15,
    fontWeight: '500'
  }
});

class TimelineList extends Component {
  render() {
    return (
      <ListView
        dataSource={this.props.listItems}
        renderRow={this.renderItem.bind(this)}
        automaticallyAdjustContentInsets={false}
      />
    );
  }

  renderItem(listItem) {
    var activity = listItem.activity_json_data;
    return (
      <View style={styles.listItem}>
        <View style={styles.row}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{ uri: activity.gravatar_url }}
              />
          </View>
          <View style={styles.activity}>
            <Text style={styles.majorText}>
              <Text style={styles.name}>{activity.from_name}</Text> moved it {listItem.time_since_in_words}
            </Text>
            <Text style={styles.minorText}>
              for {activity.duration} minutes
              and contributed ₹{activity.amount_contributed}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          {
            activity.description && activity.description.length !== 0
            ? <Text style={styles.description}>
                {activity.description}
              </Text>
            : <View />
          }
        </View>
      </View>
    );
  }
}

module.exports = TimelineList;
