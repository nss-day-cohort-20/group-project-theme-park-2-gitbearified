"use strict";

let $ = require('jquery');

const attrTypes = {};

attrTypes.getTypes = function(){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: 'https://gitbearified.firebaseio.com/attraction_types.json'
		})
		.done(function(data){
			resolve(data);
		})
		.fail(reject);
	});
};

module.exports = attrTypes;