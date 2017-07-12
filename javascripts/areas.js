"use strict";

let $ = require('jquery');

let areas = {};

areas.getAreas = function () {
	return new Promise (function (resolve, reject) {
		$.ajax({
			url: 'https://gitbearified.firebaseio.com/areas.json'
		})
		.done (function(data) {
			resolve(data);
		})
		.fail(reject);
	});
};

module.exports = areas;