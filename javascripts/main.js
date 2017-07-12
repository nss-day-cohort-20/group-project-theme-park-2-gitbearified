'use strict';

let $ = require('jquery');

let ThemePark= {
	areas: require ('./areas.js'),
	parkInfo: require ('./park-info.js'),
	attractions: require ('./attractions.js'),
	types: require ('./types.js'),
	dataProcessor: require ('./data-processor.js'),
	DOMmanager: require ('./DOM-manager.js')
};


ThemePark.parkInfo.getParkInfo()
.then (function (data) {
	let ParkInfoData = data;
	let parkInfoCard = ThemePark.dataProcessor.parkInfoOnLoad(ParkInfoData[0]);
	ThemePark.DOMmanager.writeToInfoBox(parkInfoCard);
});


ThemePark.areas.getAreas()
.then (function(data) {
	let areasData = data;
	console.log("areasData", areasData);
 ThemePark.dataProcessor.attachColorToMapSquares(areasData);
 ThemePark.dataProcessor.attachNameToMapSquares(areasData);

});


// push to data processor to package for dom using templates,
// display filtered attractions in DOM

// on click, add class .highlight that adds a border


// on area click get id of div element
$(".area-box").on("click", function() {
	let idNumber = $(this).attr("id").match(/\d+/)[0];
	ThemePark.attractions.getAttractions(idNumber);
	ThemePark.dataProcessor.giveAttractionsTypeName(ThemePark.attractions.getAttractions(idNumber));
});
