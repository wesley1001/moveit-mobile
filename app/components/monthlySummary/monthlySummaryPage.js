'use strict';

import React, {
  StyleSheet,
  Image,
  View,
  ListView,
  Text,
  Component
} from 'react-native';
import NavBar from '../navBar';
import Spinner from '../spinner';
import TopSection from './topSection';
import ContributionSection from './contributionSection';
import MonthlySummaryList from './monthlySummaryList';
import moment from 'moment';
import URLBuilder from '../../urlBuilder';

class MonthlySummaryPage extends Component {
  constructor(props) {
    var date = new Date();
    super(props);
    this.state = {
      isLoading: false,
      message: '',
      month: date.getMonth(),
      year: date.getFullYear(),
      listItems: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  render() {
    var user = this.props.user;
    return (
      <View style={{flex: 1}}>
        <NavBar
          navigator={this.props.navigator}
          title="Monthly Summary"
          showBackButton={this.props.showBackButton}
          />
        <TopSection
          name={user.name}
          email={user.email}
          avatar={user.avatar}
          />
        <ContributionSection
          month={this.state.month}
          year={this.state.year}
          totalContribution={this.state.totalContribution}
          totalDuration={this.state.totalDuration}
          />
        {this.state.isLoading ? <Spinner /> : <View />}
        <MonthlySummaryList listItems={this.state.listItems}/>
      </View>
    );
  }

  fetchData() {
    this.setState({
      isLoading: true
    });
    let url = URLBuilder.monthlySummaryURL({
      month: moment.monthsShort(this.state.month),
      email: this.props.user.email
    });
    fetch(url)
    .then(response => response.json())
    .then(response => this._handleResponse(response))
    .catch(error => this.setState({
      isLoading: false
    }));
  }

  _handleResponse(response) {
    var monthlySummary = response.user.monthly_summary
    var totalContribution = monthlySummary.map((entry) => entry.amount_contributed)
    .reduce( (prev, curr) => prev + curr )
    var totalDuration = monthlySummary.map((entry) => entry.duration)
    .reduce( (prev, curr) => prev + curr )
    this.setState({
      isLoading: false,
      totalContribution: totalContribution,
      totalDuration: totalDuration,
      listItems: this.state.listItems.cloneWithRows(monthlySummary)
    });
  }
}

module.exports = MonthlySummaryPage;
