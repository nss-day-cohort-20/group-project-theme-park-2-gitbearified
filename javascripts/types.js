"use strict";

let $ = require('jquery');

//ajax call to get attraction_types info


const attrTypes = Object.create(null);

let allTypesObj = {};

attrTypes.getTypes = function(){
	return new Promise(function(resolve, reject){
		$.ajax({
			url:'https://gitbearified.firebaseio.com/attraction_types.json'
		})
		.done(function(data){
			console.log("types ajax call!");
			putDataInAllTypesObj(data);
			resolve(allTypesObj);

		})
		.fail(reject);
	});
};

function putDataInAllTypesObj(data) {
	let dataValues = Object.values(data);
	let newObj = dataValues.reduce(function(acc, cur) {
		acc[cur.id] = cur.name;
		return acc;
	},{});
	allTypesObj = newObj;
}

attrTypes.getAttrTypesObj = function() {
	return allTypesObj;
};

attrTypes.giveAttractsTheirTypeName = function(arrayOfAttractionObjects) {
	let attractionsArray = arrayOfAttractionObjects;
	for (var i = 0; i < attractionsArray.length; i++) {
		attractionsArray[i].type = allTypesObj[attractionsArray[i].type_id];
	}
	return attractionsArray;
};

// function getTypeName(data, idNumber) {
// 	$.each(data, function(key, val) {
// 		console.log("ids", val.id, idNumber);
// 		if (val.id == idNumber) {
// 			// console.log("type name?", val.name);
// 			return val.name;
// 		}
// 	});
// }




// function giveAttractionsTypeName(arrAttObjs, data, idNumber){
// 	console.log("array before", arrAttObjs, "data", data, "idnumber", idNumber);
// 	for (var i = 0; i < arrAttObjs.length; i++) {
// 		let newObjs = arrAttObjs;
// 		newObjs[i].type = getTypeName(data, idNumber);
// 		console.log("after", newObjs);

// 	}

// }

module.exports = attrTypes;