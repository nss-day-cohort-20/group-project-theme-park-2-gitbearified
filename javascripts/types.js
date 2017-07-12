"use strict";

let $ = require('jquery');

//ajax call to get attraction_types info

const attrTypes = Object.create(null);

attrTypes.getTypes = function(arrOfAttractions, idNumber){
	return new Promise(function(resolve, reject){
		$.ajax({
			url:'https://gitbearified.firebaseio.com/attraction_types.json'
		})
		.done(function(data){
			resolve(giveAttractionsTypeName(arrOfAttractions, data, idNumber));
		})
		.fail(reject);
	});
};

function getTypeName(data, idNumber) {
	$.each(data, function(key, val) {
		console.log("ids", val.id, idNumber);
		if (val.id == idNumber) {
			console.log("type name?", val.name);
			return val.name;
		}
	});
}


function giveAttractionsTypeName(arrAttObjs, data, idNumber){
	console.log("array before", arrAttObjs, "data", data, "idnumber", idNumber);
	for (var i = 0; i < arrAttObjs.length; i++) {
		let newObj = arrAttObjs;
		console.log("before", newObj);
		arrAttObjs[i].type_id = getTypeName(data, idNumber);
		console.log("after", newObj);

	}

}

module.exports = attrTypes;