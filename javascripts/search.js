'use strict';

let $ = require('jquery');

let searchBar = {};

searchBar.filterAttractions = function(string, attractions) {
	return new Promise(function(resolve, reject) {
		let newArr = attractions.filter(function(object) {
			return object.name.match(new RegExp(string, "i"));
		});
		resolve(newArr);
	});
};

searchBar.highlightAreas = function(searchedAttractions) {
	$('.area-box').removeClass("highlight");
	searchedAttractions.map(function(object) {
		$(`#grid${object.area_id}`).addClass('highlight');
	});
};

module.exports  = searchBar;
