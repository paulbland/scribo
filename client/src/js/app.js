var scribo = scribo || {};

var Backbone = require('backbone');
scribo.AppView = require('./views/app.js');

$(function() { 
	new scribo.AppView();
});