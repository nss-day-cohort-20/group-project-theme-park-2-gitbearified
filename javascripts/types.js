"use strict";

let $ = require('jquery');

//ajax call to get attraction_types info

const attrTypes = Object.create(null);

attrTypes.getTypes = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url:'https://gitbearified.firebaseio.com/attraction_types.json'
		})
		.done(function(data){
			resolve(data);
		})
		.fail(reject);
	});
};

function getTypeName(data, id) {
	$.each(data, function(key, val) {
		if (val.id == id) {
			return val.name;
		}
	});
}

module.exports = attrTypes;