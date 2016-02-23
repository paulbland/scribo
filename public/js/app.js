var app = app || {};

	$(function() {

		// Model
		app.CardModel = Backbone.Model.extend({});

		// Collection
		app.CardCollection = Backbone.Collection.extend({
		  	model: app.CardModel,
		  	url: '/api/cards'
		});

		// Create new collectino
	 	app.cards = new app.CardCollection();

	 	// get cards collection
		app.cards.fetch();



	  app.AppView = Backbone.View.extend({
	     el: $('#cards'),

	     initialize: function() {
			this.listenTo(app.cards, 'reset', this.addAll);
     		app.cards.fetch({reset: true});
        },

		addOne: function (card) {
			var view = new app.CardView({ model: card });
			this.$el.append(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			app.cards.each(this.addOne, this);

			$( "#cards" ).sortable();
			$( "#cards" ).disableSelection();
		}
	});


	  app.CardView = Backbone.View.extend({

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

	 new app.AppView();


		
});