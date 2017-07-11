'use strict';

let $ = require('jquery');

let areasInfo = require ('./areas.js');
let attractions = require('./attractions.js');

// console.log("areas info?", areasInfo.getAreas());



// push to data processor to package for dom using templates,
// display filtered attractions in DOM

// on click, add class .highlight that adds a border














// on area click get id of div element
$(".area-box").on("click", function() {
	let idNumber = $(this).attr("id").match(/\d+/)[0];
	attractions.getAttractions(idNumber);
});