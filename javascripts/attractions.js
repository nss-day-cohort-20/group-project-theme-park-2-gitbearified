"use strict";

let $ = require('jquery');

let attractions = {};

attractions.getAttractions = function() {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: 'https://gitbearified.firebaseio.com/attractions.json'
		})
		.done(function(data) {
			resolve(Object.values(data));
		})
		.fail(function(error) {
			console.log(error.statusText);
		});
	});
};

module.exports = attractions;