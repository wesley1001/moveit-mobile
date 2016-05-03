import AppConfig from '../../appConfig.js';

class GetCharityData {
  getData(){
    var CHARITY_DATA_ARRAY = [];
    var url = AppConfig.charitySpreadSheetUrl;
    fetch(url).then((response) => response.json())
      .then((responseText) => {
        entry = responseText.feed.entry;
        entry.forEach(function(element){
          CHARITY_DATA_ARRAY.push({amount: element.gsx$charityamount.$t, month: element.gsx$month.$t, year: element.gsx$year.$t, name: element.gsx$charityname.$t, description: element.gsx$charitydesc.$t, imageSource: element.gsx$charityimage.$t });
        });
      })
      .catch((error) => {
        console.warn(error);
      });
    return CHARITY_DATA_ARRAY;
  }
}
export default new GetCharityData();
