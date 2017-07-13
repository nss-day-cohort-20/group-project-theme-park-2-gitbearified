//Given the user wants to see all attractions operating at a specific hour
// When the user performs a gesture on a time selection element above the park grid
// Then all attractions that operate at that hour should be listed in the left 30% of the screen
// And the attraction type should be in parenthesis next to the name
// And the name should be a hyperlink

'use strict';
let timepicker = {};
let $ = require ('jquery');

let attractionsFactory = require ('./attractions.js');
let attractionsWithTypes = require ('./data-processor.js');
let types = require ('./types.js');
let newArray = [];
let attractions = null;

timepicker.getTimePickerValue = function() {
	return $('#timepicker').val();

};
attractionsFactory.getAttractions()
	.then (function(AttractionsObj) {
		attractions = AttractionsObj;
		return types.getTypes();
	})
	.then (function(typesData) {
		let newTypesObj = attractionsWithTypes.reformatTypeData(typesData);
		attractions = attractionsWithTypes.giveAttractsTheirTypeName(newTypesObj, attractions);
		showTimes();
		// console.log("getter", hoursGetter());
	});


let allTimesArray = [];
let uniqueTimesArray = [];
let timesPM = [];
let timesAM = [];
let finalPMArray = [];
let finalAMArray = [];

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
	console.log("array without PM", nakedTimesPM);
	orderUpTimesPM(nakedTimesPM);
}

function orderUpTimesAM (timesArrayToPutInOrder) {
	finalAMArray = timesArrayToPutInOrder.sort(function (a, b) {
	    return Date.parse('01/01/2017 '+a) - Date.parse('01/01/2017 '+b);
	});
}

function orderUpTimesPM (timesArrayToPutInOrder) {
	let timesInOrderPM = timesArrayToPutInOrder.sort(function (a, b) {
	    return Date.parse('01/01/2017 '+a) - Date.parse('01/01/2017 '+b);
	});
	rearrangePMs(timesInOrderPM);
}


function rearrangePMs (arrayOfPMTimes) {
		let noonerArray = [];

	for (let i=arrayOfPMTimes.length-1; i>1; i--) {
		if (arrayOfPMTimes[i].match(/12:[0-9]*/g) !== null) {
		let timeToMove = arrayOfPMTimes.pop(arrayOfPMTimes[i].match(/12:[0-9]*/g)[0]);
		console.log("time to move", timeToMove);
		noonerArray.unshift(timeToMove);
		console.log("noonerArray", noonerArray);
		let afternoonArray = arrayOfPMTimes;
		console.log("afternoon array", afternoonArray);
		}
	}
		finalPMArray = noonerArray.concat(arrayOfPMTimes);
		console.log("final PM array", finalPMArray);
		// hoursGetter(finalPMArray);
}

function objectify (amArray, PMarray) {
  return {
  	AM: amArray,
  	PM: PMarray
  };
}

timepicker.hoursGetter = function() {
	return objectify(finalAMArray, finalPMArray);
};

module.exports = timepicker;

