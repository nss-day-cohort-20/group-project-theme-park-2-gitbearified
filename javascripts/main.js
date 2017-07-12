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
	 ThemePark.dataProcessor.attachColorToMapSquares(areasData);
	 ThemePark.dataProcessor.attachNameToMapSquares(areasData);

});


// push to data processor to package for dom using templates,
// display filtered attractions in DOM

// on click, add class .highlight that adds a border


// on area click get id of div element
$(".area-box").on("click", function() {
	let idNumber = $(this).attr("id").match(/\d+/)[0];
	var selectedAttractions;
	return ThemePark.attractions.getAttractions()
		.then (function(arrayOfAllAttractionObjs) {
			return ThemePark.dataProcessor.getSelected(arrayOfAllAttractionObjs, idNumber);
		})
		.then (function(arrayOfSelectedAttractions) {
			selectedAttractions = arrayOfSelectedAttractions;
			return ThemePark.types.getTypes();
		})
		.then (function(typesData) {
			let newTypesObj = ThemePark.dataProcessor.reformatTypeData(typesData);
			selectedAttractions = ThemePark.dataProcessor.giveAttractsTheirTypeName(newTypesObj, selectedAttractions);
			console.log(selectedAttractions);
		});
});

		// if(Object.keys(ThemePark.types.getAttrTypesObj()).length === 0) {
			// ThemePark.types.getTypes();

