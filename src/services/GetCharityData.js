class GetCharityData {
  getData(){
    var CHARITY_DATA_ARRAY = [];
    var spreadsheetID = "1f1tFr7y62QS7IRWOC2nNR5HWsTO99Bna3d0Xv1PTPiY";
    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
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
