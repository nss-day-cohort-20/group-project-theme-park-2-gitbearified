"use strict";

let $ = require('jquery');

//ajax call to get attraction_types info

const attrTypes = Object.create(null);

attrTypes.getTypes = function(){
	return new Promise(function(resolve, reject){
		$.ajax({
			url:'https://gitbearified.firebaseio.com/attraction_types.json'
		})
		.done(function(typesData){
			resolve(typesData);
		})
		.fail(reject);
	});
};

module.exports = attrTypes; //export object