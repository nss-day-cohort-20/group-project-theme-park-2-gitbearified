'use strict';

let $ = require('jquery');

let DOMmanager = Object.create(null);

let $parkInfoDiv = $('.parkInfo');

DOMmanager.writeToInfoBox = function (stuffToPrint) {
	console.log("stuff passed in", stuffToPrint);
	$parkInfoDiv.append(stuffToPrint);
};

module.exports = DOMmanager;