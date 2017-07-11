'use strict';

let $ = require('jquery');

let attractions = {};
let selectedAttractions = [];

attractions.getAttractions = function(id) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: "https://gitbearified.firebaseio.com/attractions.json"
		})
		.done(function(data) {
			resolve(getSelected(data, id));
		})
		.fail(function(error) {
			console.log(error.statusText);
		});
	});
};

// match the id to area id,
// compare to area_id in attractions,
function getSelected(data, id) {
	selectedAttractions = [];
	$.each(data, function(key, val) {
		if (val.area_id == id) {
			selectedAttractions.push(val);
		}
	});
	console.log(selectedAttractions);
	return selectedAttractions;
}

module.exports = attractions;