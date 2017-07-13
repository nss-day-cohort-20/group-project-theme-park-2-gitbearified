'use strict';

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
let attractionTemplate = require('../templates/attractions.hbs');

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
	return ParkInfoData;
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
			return ThemePark.parkInfo.getParkInfo();

		})
		.then(function(ParkInfoData){

			//need parkInfo called here
			ThemePark.dataProcessor.giveAttractsParkHours(ParkInfoData, selectedAttractions);
			//need to modify selectedAttractions to have key value pair parkHours opening to closing
			let attractions={selectedAttractions};//for handlebars
			console.log ("attractions", attractions);
			ThemePark.DOMmanager.writeToInfoBox(attractionTemplate(selectedAttractions));
		});
});

$(".parkInfo").on("click", function(event) {
	let selected = $(event.target).nextUntil("h3");
	selected.filter("p").toggleClass("isHidden");
});
