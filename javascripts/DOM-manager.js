'use strict';

let $ = require('jquery');

let DOMmanager = Object.create(null);

DOMmanager.writeToDOM = function (stuffToPrint, whereToPrint) {
	whereToPrint.html(stuffToPrint);
};

module.exports = DOMmanager;