'use strict';

let $ = require('jquery');

let DOMmanager = Object.create(null);

DOMmanager.writeToDOM = function (stuffToPrint, whereToPrint) {
	// console.log("stuff passed in", stuffToPrint);
	whereToPrint.html(stuffToPrint);
};
// DOMmanager.writeToInfoBox = function (stuffToPrint) {
// 	// console.log("stuff passed in", stuffToPrint);
// 	$parkInfoDiv.html(stuffToPrint);
// };

module.exports = DOMmanager;