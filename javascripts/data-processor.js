'use strict';

let $ = require('jquery');

let dataProcessor = Object.create(null);

dataProcessor.parkInfoOnLoad = function (ParkInfoData) {
	let parkInfoCard = `<h2>${ParkInfoData.name}</h2>
	<h3>${ParkInfoData.location}</h3>
	<p>${ParkInfoData.description}</p>
	<p>Hours: ${ParkInfoData.operating_hours[0].opening} am to ${ParkInfoData.operating_hours[0].closing} pm</p>`;
	// console.log("park info card", parkInfoCard);
return parkInfoCard;
};
dataProcessor.attachColorToMapSquares =function(areasData){
	// let $divArray= $('section.map').find('.mapSq');//stores all the divs with mapSq class
	 // console.log ("divArray", $divArray);
	 let counter= 1;
	for (let item in areasData) {
		console.log ("gridcounter", $(`#grid${counter}`));
		$(`#grid${counter}`).css('background-color', `${areasData[item].colorTheme}`);
		counter++;
	}
// $('#grid1').css('background-color', '#bada55');

};



dataProcessor.giveAttractionsTypeName = function(arrAttObjs, types){
	for (var i = 0; i < arrAttObjs.length; i++) {
		arrAttObjs[i].type_id = types;
	}

};

module.exports = dataProcessor;