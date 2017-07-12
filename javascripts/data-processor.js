'use strict';

let $ = require('jquery');

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



dataProcessor.giveAttractionsTypeName = function(arrAttObjs, types){
	for (var i = 0; i < arrAttObjs.length; i++) {
		arrAttObjs[i].type_id = types;
	}
	return parkInfoCard;
};

module.exports = dataProcessor;