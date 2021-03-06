"use strict";

let $ = require('jquery');

let parkInfo = {};

parkInfo.getParkInfo = function() {
	return new Promise ( function(resolve, reject) {
		$.ajax({
  			url: 'https://gitbearified.firebaseio.com/park-info.json'
		})
		.done( function(data) {
		  resolve(data);
		})
		.fail(reject);
	});
};

module.exports = parkInfo;