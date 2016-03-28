import React, {
    Component,
    Image,
    Text,
    StyleSheet,
    View
} from 'react-native' ;


var styles = StyleSheet.create({
	header: {
    	flex: 1,
    	flexDirection: 'row',
    	backgroundColor: '#fff',
    	justifyContent: 'space-between',
    	padding: 10,
  	},
  	body: {
  		padding: 25,
  		borderWidth: .5,
  		borderRadius: 2,
        borderColor: '#999',
  	},
  	month: {
    	color: '#000',
    	fontSize: 22,
    	padding: 2
  	},
  	year: {
    	color: '#000',
    	fontSize: 22,
    	padding: 2
  	},
  	amount: {
    	color: '#000',
    	fontSize: 16,
    	fontWeight: 'bold'
	},
	charityImage: {
		height: 210,
    	resizeMode: 'stretch',
    	flex: 1,
        alignItems: 'center',
        padding: 60,
	},
	amountContainer:{
		backgroundColor: '#FBF697',
		padding: 5
	},
	charityDescription : {
		flex: 1,
		color: '#000',
    	fontSize: 14,
        justifyContent: 'center',
	},
	entry: {
		borderBottomWidth: .3,
		borderColor: '#999',
		padding: 18,
		paddingBottom: 22,

	},
	dateContainer: {
		flexDirection: 'row',
	},
	charityName : {
		margin: 2,
		color: '#3399FF',
		padding: 2
	},

});


export default class CharityEntry extends Component {
	render(){
		return(
			<View style={styles.entry}>
			    <View style={styles.header}>
			        <View style={styles.dateContainer}>
				        <Text style={styles.month}>{this.props.entry.month}</Text>
				        <Text style={styles.year}>{this.props.entry.year}</Text>
				    </View>
				    <View style={styles.amountContainer}>
				    	<Text style={styles.amount}>${this.props.entry.amount}</Text>
				    </View>
				</View>
				<View style={styles.body}>
					<Image style={styles.charityImage} source={{uri: this.props.entry.imageSource}}/>
					<Text style={styles.charityName}>{this.props.entry.name}</Text>
					<Text style={styles.charityDescription}> {this.props.entry.description} </Text>
				</View>
			</View>
			);
	}
}
