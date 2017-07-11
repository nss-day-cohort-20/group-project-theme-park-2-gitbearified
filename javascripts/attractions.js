'use strict';

let $ = require('jquery');

let attractions = {};

attractions.getAttractions = function(id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "https://gitbearified.firebaseio.com/attractions.json"
		})
		.done(function(data) {
			getSelected(data, id);
			resolve(data);
		})
		.fail(function(error) {
			console.log(error.statusText);
		});
	});
};

// match the id to area id,
// compare to area_id in attractions,
function getSelected(data, id) {
	$.each(data, function(key, val) {
		if (val.area_id == id) {
			console.log(val.name);
		}
	});
}

module.exports = attractions;