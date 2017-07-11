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
	console.log("ParkInfoData", ParkInfoData);
	let parkInfoCard = ThemePark.dataProcessor.parkInfoOnLoad(ParkInfoData[0]);
	ThemePark.DOMmanager.writeToInfoBox(parkInfoCard);
});


ThemePark.areas.getAreas()
.then (function(data) {
	let areasData = data;
	// console.log("areasData", areasData);
	for (let item in areasData) {
		// console.log(areasData[item].colorTheme);
	}
});
	//THEN go through it to find colors
//then print that to the DOM - use js
//