//Given the user wants to see all attractions operating at a specific hour
// When the user performs a gesture on a time selection element above the park grid
// Then all attractions that operate at that hour should be listed in the left 30% of the screen
// And the attraction type should be in parenthesis next to the name
// And the name should be a hyperlink

'use strict';

let $ = require ('jquery');

let attractionsFactory = require ('./attractions.js');
let attractionsWithTypes = require ('./data-processor.js');
let types = require ('./types.js');
let newArray = [];
let attractions = null;

attractionsFactory.getAttractions()
	.then (function(AttractionsObj) {
		attractions = AttractionsObj;
		return types.getTypes();
	})
	.then (function(typesData) {
		let newTypesObj = attractionsWithTypes.reformatTypeData(typesData);
		attractions = attractionsWithTypes.giveAttractsTheirTypeName(newTypesObj, attractions);
		showTimes();
	});


let allTimesArray = [];
let uniqueTimesArray = [];
let timesPM = [];
let timesAM = [];

function showTimes () {
	for (var key in attractions) {
		let attrTime = attractions[key].times;
		 if (attrTime !== undefined) {
		 	attrTime.forEach( item => {
			 	allTimesArray.push(item);
		 	});
		}
	}
 	makeArrayOfPossTimes(allTimesArray);
}

//time selection element?
function makeArrayOfPossTimes (bigArray) {
	bigArray.forEach(function(item){
		if (uniqueTimesArray.indexOf(item) === -1) {
			uniqueTimesArray.push(item);
		}
	});
 	console.log("times array", uniqueTimesArray);
	sortTimes(uniqueTimesArray);
}

function sortTimes (timesArray) {
	timesArray.forEach(function(time) {
		if (time.includes('P')){
			timesPM.push(time);
		} else {
			timesAM.push(time);
		}
		
	});
	console.log("AM", timesAM);
	takeOffAM(timesAM);
	takeOffPM(timesPM);
	console.log("PM", timesPM);
}


function takeOffAM (arrayOfTimesToSliceUp) {
	console.log("times to slice", arrayOfTimesToSliceUp);
	let nakedTimesAM = arrayOfTimesToSliceUp.map(function(item){
		// console.log("item?", item);
		return item.substr(0, item.length-2);
	});
	console.log("array without AM", nakedTimesAM);
	orderUpTimesAM(nakedTimesAM);
}

function takeOffPM (arrayOfTimesToSliceUp) {
	console.log("times to slice", arrayOfTimesToSliceUp);
	let nakedTimesPM = arrayOfTimesToSliceUp.map(function(item){
		// console.log("item?", item);
		return item.substr(0, item.length-2);
	});
	console.log("array without AM", nakedTimesPM);
	orderUpTimesPM(nakedTimesPM);
}


function orderUpTimesAM (timesArrayToPutInOrder) {
	let timesInOrderAM = timesArrayToPutInOrder.sort(function (a, b) {
	    return Date.parse('01/01/2017 '+a) - Date.parse('01/01/2017 '+b);
	});
	console.log("are these in order?", timesInOrderAM);
}

function orderUpTimesPM (timesArrayToPutInOrder) {
	let timesInOrderPM = timesArrayToPutInOrder.sort(function (a, b) {
	    return Date.parse('01/01/2017 '+a) - Date.parse('01/01/2017 '+b);
	});
	console.log("are these in order?", timesInOrderPM);
}
//if it contains "am" psuh to this array
//if it contains PM push to that array.


	// console.log("attraction times", timesArray);


// function findAttractions (stringToSearch) {
// 	console.log("string to search", stringToSearch);
// 	for (var key in attractions) {
// 		if (attractions[key].name.includes(stringToSearch)) {
// 			newArray.push(attractions[key]);
// 		}
// 	}
// 		console.log("show the results array", newArray);
// } 