var scribo = scribo || {};

scribo.CardModel = Backbone.Model.extend({

	defaults : {
		color: 1,
		text: '',
		order: 0
	},

	idAttribute: '_id',
});

scribo.CardCollection = Backbone.Collection.extend({
  	model: scribo.CardModel,
  	url: '/api/cards'
});
