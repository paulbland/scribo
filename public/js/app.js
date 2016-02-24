var scribo = scribo || {};

$(function() {

	// Model
	scribo.CardModel = Backbone.Model.extend({});

	// Collection
	scribo.CardCollection = Backbone.Collection.extend({
	  	model: scribo.CardModel,
	  	url: '/api/cards'
	});

	// Create new collectino
 	scribo.cards = new scribo.CardCollection();

 	// get cards collection
	scribo.cards.fetch();



	scribo.AppView = Backbone.View.extend({
	    el: $('#cards'),

	    initialize: function() {
			this.listenTo(scribo.cards, 'reset', this.addAll);
	 		scribo.cards.fetch({reset: true});
	    },

		addOne: function (card) {
			var view = new scribo.CardView({ model: card });
			this.$el.append(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			scribo.cards.each(this.addOne, this);

			$( "#cards" ).sortable();
			$( "#cards" ).disableSelection();
		}
	}); 


	scribo.CardView = Backbone.View.extend({

		tagName: 'li',

		className: function() {
			return 'card style-' + this.model.get('color');
		},

		template: _.template( $('#card-template').html() ),

		render: function () {

	 		this.$el.html(this.template(this.model.toJSON()));
	 		return this;
		}

	});

	new scribo.AppView();

	
});