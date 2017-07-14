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
let optionsTemplate = require('../templates/options.hbs');
let newArray = [];
let attractions = null;

timepicker.getTimePickerValue = function() {
	return $('#timepicker').val();


//get the attractions objects with their types, then call the next function at the end of the promise
};

let allTimesArray = [];
let uniqueTimesArray = [];
let timesPM = [];
let timesAM = [];
let finalPMArray = [];
let finalAMArray = [];

timepicker.showTimes = function (attractions) {
	for (var key in attractions) {
		let attrTime = attractions[key].times;
		 if (attrTime !== undefined) {
		 	allTimesArray = [...allTimesArray, ...attrTime];
		 	}
	}
	
 	makeArrayOfPossTimes(allTimesArray);
}

//make sure times are unique and do not repeat
function makeArrayOfPossTimes (bigArray) {
	bigArray.forEach(function(item){
		if (uniqueTimesArray.indexOf(item) === -1) {
			uniqueTimesArray.push(item);
		}
	});
 	console.log("times array", uniqueTimesArray);
	sortTimes(uniqueTimesArray);
}

//sort into two arrays, one each for AM and PM
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

//cut the letters off each array of times (am/pm)
function takeOffAM (arrayOfTimesToSliceUp) {
	console.log("times to slice", arrayOfTimesToSliceUp);
	let nakedTimesAM = arrayOfTimesToSliceUp.map(function(item){
		return item.substr(0, item.length-2);
	});
	orderUpTimesAM(nakedTimesAM);
}

function takeOffPM (arrayOfTimesToSliceUp) {
	console.log("times to slice", arrayOfTimesToSliceUp);
	let nakedTimesPM = arrayOfTimesToSliceUp.map(function(item){
		return item.substr(0, item.length-2);
	});
	orderUpTimesPM(nakedTimesPM);
}

//put AM times in order -- this does not need rearranging so this makes the FINAL am array (without "AM" on it)
function orderUpTimesAM (timesArrayToPutInOrder) {
	finalAMArray = timesArrayToPutInOrder.sort(function (a, b) {
	    return Date.parse('01/01/2017 '+a) - Date.parse('01/01/2017 '+b);
	});
}

//put PM times in order, but times with "12" end up at the end of list instead of beginning
function orderUpTimesPM (timesArrayToPutInOrder) {
	let timesInOrderPM = timesArrayToPutInOrder.sort(function (a, b) {
	    return Date.parse('01/01/2017 '+a) - Date.parse('01/01/2017 '+b);
	});
	rearrangePMs(timesInOrderPM);
}

//cut the 12-something times from the end of the array and stick them on the front of it
function rearrangePMs (arrayOfPMTimes) {
	let noonerArray = [];
	for (let i=arrayOfPMTimes.length-1; i>1; i--) {
		if (arrayOfPMTimes[i].match(/12:[0-9]*/g) !== null) {
			let timeToMove = arrayOfPMTimes.pop(arrayOfPMTimes[i].match(/12:[0-9]*/g)[0]);
			noonerArray.unshift(timeToMove);
			let afternoonArray = arrayOfPMTimes;
		}
	}
		finalPMArray = noonerArray.concat(arrayOfPMTimes);
		console.log("final PM array", finalPMArray);
		timepicker.hoursGetter(finalPMArray);
}


//package both arrays as an object
function objectify (amArray, PMarray) {
  return {
  	AM: amArray,
  	PM: PMarray
  };
}

//make hours available to rest of app
timepicker.hoursGetter = function() {
		return objectify(finalAMArray, finalPMArray);

};


module.exports = timepicker;

