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
		findAttractions("Railroad");
	});

function findAttractions (stringToSearch) {
	console.log("string to search", stringToSearch);
	for (var key in attractions) {
		if (attractions[key].name.includes(stringToSearch)) {
			newArray.push(attractions[key]);
		}
	}
		console.log("show the results array", newArray);
} 


// let newArr = Object.values(attractions);
// iterate over an array of objects, using each object's name value as a string and using some string prototype thing to find if the name includes the input string by the user.

