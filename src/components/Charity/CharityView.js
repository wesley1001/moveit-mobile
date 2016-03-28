import React, {
    Component,
    Image,
    ListView,
    Text,
    StyleSheet,
    View
} from 'react-native' ;
import CharityEntry from './CharityEntry.js' ;
import GetCharityData from '../../services/GetCharityData.js'


var CHARITY_DATA = GetCharityData.getData();

var styles = StyleSheet.create ({
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    height: 78,
    backgroundColor: '#FEE66C',
  },
  headerText: {
    flexDirection: 'column',
    flex: 0.7,
  },
  logo: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
    flex: 0.2,
  },
  amountSection: {
    paddingTop: 10,
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  totalAmount: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default class CharityView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
    })
  };
}

componentDidMount() {
    var charityActivities = CHARITY_DATA;
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(charityActivities)
  });
}

render (){
    let logoimage = require('../../img/logo.png');  
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoimage} style={styles.logo} />
                <View style={styles.headerText}>    
                    <View style={styles.amountSection}>
                        <Text style={styles.totalAmount}>₹41,234</Text>
                    </View>
                </View>
            </View>
            <ListView dataSource={this.state.dataSource} renderRow={this.renderCharityEntry.bind(this)} />
        </View>
    );
}

renderCharityEntry(entry) {
    return (
      <CharityEntry entry={entry}/> 
      );
  }
}