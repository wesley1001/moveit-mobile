class GetCharityData {
	getData(){
		var CHARITY_DATA = [
			{amount: '41,234', month: 'January', year: '2015', name: 'Charity:Water', description: 'Cool description that was so hard to come up with. Hence I ended up writing some random text that dosent make much text' ,imageSource: 'https://s3.amazonaws.com/moveit-multunus/charity_resources/March2015/GiveIndia_education_march_2015.png'},
			{amount: '41,234', month: 'February',  year: '2015', name: 'Charity:Water', description: 'Cooler description hat was so hard to come up with. Hence I ended up writing some random text that dosent make much text',imageSource: 'https://s3.amazonaws.com/moveit-multunus/charity_resources/April2015/charity_water+Apr+2015.png'},
			{amount: '21,234', month: 'March',  year: '2015', name: 'Charity:Water', description: 'Coolest description hat was so hard to come up with. Hence I ended up writing some random text that dosent make much text',imageSource: 'https://s3.amazonaws.com/moveit-multunus/charity_resources/April2015/charity_water+Apr+2015.png'}
		];
		return CHARITY_DATA ;
	}
}

export default new GetCharityData();