'use strict';

let $ = require('jquery');
let Handlebars = require('hbsfy/runtime');
let attractionTemplate = require('../templates/attractions.hbs');

let dataProcessor = Object.create(null);

dataProcessor.parkInfoOnLoad = function (ParkInfoData) {
	let parkInfoCard = `<h2>${ParkInfoData.name}</h2>
		<h3>${ParkInfoData.location}</h3>
		<p>${ParkInfoData.description}</p>
		<p>Hours: ${ParkInfoData.operating_hours[0].opening} am to ${ParkInfoData.operating_hours[0].closing} pm</p>`;
	return parkInfoCard;
};

dataProcessor.attachColorToMapSquares = function(areasData){
	// let $divArray= $('section.map').find('.mapSq');//stores all the divs with mapSq class
	 let counter= 1;
	for (let item in areasData) {
		console.log ("gridcounter", $(`#grid${counter}`));
		$(`#grid${counter}`).css('background-color', `${areasData[item].colorTheme}`);
		counter++;
	}
};

dataProcessor.attachNameToMapSquares = function(areasData) {
	let counter = 1;
	for (let item in areasData) {
		$(`#grid${counter}`).attr("title", `${areasData[item].name}`);
		$(`#grid${counter}`).html(`<h2>${areasData[item].name}</h2>`);
		counter ++;
	}
};

// match the id to area id,
// compare to area_id in attractions,
dataProcessor.getSelected = function(data, id) {
	return new Promise (function(resolve, reject) {
	let selectedAttractions = [];
		$.each(data, function(key, val) {
			if (val.area_id == id) {
				selectedAttractions.push(val);
			}
		});
	resolve(selectedAttractions);
	// fail? reject?
	});
};

dataProcessor.reformatTypeData = function(data) {
	let dataValues = Object.values(data);
	let newObj = dataValues.reduce(function(acc, cur) {
		acc[cur.id] = cur.name;
		return acc;
	},{});
	return newObj;
};

dataProcessor.giveAttractsTheirTypeName = function(newTypesObj, arrayOfAttractionObjects) {
	let attractionsArray = arrayOfAttractionObjects;
	for (var i = 0; i < attractionsArray.length; i++) {
		attractionsArray[i].type = newTypesObj[attractionsArray[i].type_id];
	}
	return attractionsArray;
};

module.exports = dataProcessor;