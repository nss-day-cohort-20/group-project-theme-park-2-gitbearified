'use strict';

let $ = require('jquery');

let dataProcessor = Object.create(null);

dataProcessor.parkInfoOnLoad = function (ParkInfoData) {
	let parkInfoCard = `<h2>${ParkInfoData.name}</h2>
	<h3>${ParkInfoData.location}</h3>
	<p>${ParkInfoData.description}</p>
	<p>Hours: ${ParkInfoData.operating_hours[0].opening} am to ${ParkInfoData.operating_hours[0].closing} pm</p>`;
	console.log("park info card", parkInfoCard);
return parkInfoCard;
};

dataProcessor.giveAttractionsTypeName = function(arrAttObjs, types){
	for (var i = 0; i < arrAttObjs.length; i++) {
		arrAttObjs[i].type_id = types;
	}

};

module.exports = dataProcessor;