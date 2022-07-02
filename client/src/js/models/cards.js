var scribo = scribo || {};

scribo.CardModel = Backbone.Model.extend({

	defaults : {
		color: 1,
		text: '',
		order: 0
	},

	idAttribute: '_id',
});

module.exports = Backbone.Collection.extend({
  	model: scribo.CardModel,
  	url: '/api/cards'
});
