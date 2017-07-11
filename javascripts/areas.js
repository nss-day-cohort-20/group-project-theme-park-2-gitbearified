'use strict';

let $ = require('jquery');

let areas = {};

areas.getAreas = function () {
	return new Promise (function (resolve, reject)
	{
		$.ajax({
			url: 'https://gitbearified.firebaseio.com/areas.json'
		}).done (function(areasData) {
			resolve(areasData);
		}).
		fail(reject);
	});
};

module.exports = areas;