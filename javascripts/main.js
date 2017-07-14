'use strict';

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
let attractionTemplate = require('../templates/attractions.hbs');
let $parkInfoDiv = $('.parkInfo');
let search = require('./search.js');
let timepicker = require('./timepicker.js');


let ThemePark= {
	areas: require ('./areas.js'),
	parkInfo: require ('./park-info.js'),
	attractions: require ('./attractions.js'),
	types: require ('./types.js'),
	dataProcessor: require ('./data-processor.js'),
	DOMmanager: require ('./DOM-manager.js'),
	timepicker: require ('./timepicker.js')
};

ThemePark.parkInfo.getParkInfo()
.then (function (data) {
	let ParkInfoData = data;
	let parkInfoCard = ThemePark.dataProcessor.parkInfoOnLoad(ParkInfoData[0]);
	ThemePark.DOMmanager.writeToDOM(parkInfoCard, $parkInfoDiv);
	return ParkInfoData;
});

ThemePark.areas.getAreas()
.then (function(data) {
	let areasData = data;
	 ThemePark.dataProcessor.attachColorToMapSquares(areasData);
	 ThemePark.dataProcessor.attachNameToMapSquares(areasData);
});

//fills time picker with times
// ThemePark.attractions.getAttractions()
// .then (function(allAttractions) {
// 	console.log("all times", timepicker.getAllTimes(allAttractions));
// });

// on area click get id of div element
$(".area-box").on("click", function() {
	ThemePark.DOMmanager.removeAllHighlights();
	let mapChoice = event.currentTarget;
	$(mapChoice).addClass("highlight");
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
			ThemePark.dataProcessor.giveAttractsParkHours(ParkInfoData, selectedAttractions);
			console.log("after", selectedAttractions);
			let attractions={selectedAttractions};//for handlebars
			ThemePark.DOMmanager.writeToDOM(attractionTemplate(selectedAttractions), $parkInfoDiv);
		});
});


$(".parkInfo").on("click", function(event) {
	let selected = $(event.target).nextUntil("h3");
	$("p").addClass("isHidden");
	selected.filter("p").removeClass("isHidden");
});

$(document).keypress (function(event) {
	if (event.which == '13') {
		event.preventDefault();
		return ThemePark.attractions.getAttractions()
			.then (function(allAttractions) {
				return search.filterAttractions($('#search').val(), allAttractions);
			})
			.then (function(searchedAttractions) {

				search.highlightAreas(searchedAttractions);
			});
	}
});


$('#timepicker').change( function() {
	let time = $('#timepicker').val();
	if (time !== "--select a time--") {
		ThemePark.attractions.getAttractions()
		.then(function(attractions){
			return timepicker.attractionsTime(attractions, time);
		})
		.then(function(attractionObjectArrayByTime) {
			console.log("array of attractions by time", attractionObjectArrayByTime);
		});
	}
});


// ThemePark.DOMmanager.writeToDOM(attractionTemplate(selectedAttractions), $parkInfoDiv)


