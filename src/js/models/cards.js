var scribo = scribo || {};


// Model
scribo.CardModel = Backbone.Model.extend({
	defaults : {
		color: 1,
		text: ''
	},

	// yes! this line allows  PUT instad of post - to update
	idAttribute: '_id',
	
	 // urlRoot: '/api/cards'
});

// Collection
scribo.CardCollection = Backbone.Collection.extend({
  	model: scribo.CardModel,
  	url: '/api/cards'
});
