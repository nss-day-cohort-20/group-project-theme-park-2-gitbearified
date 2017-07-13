'use strict';

let $ = require('jquery');
let timepicker = {};

timepicker.getTimePickerValue = function() {
	return $('#timepicker').val();

};

module.exports = timepicker;