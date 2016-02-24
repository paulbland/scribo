var scribo = scribo || {};

$(function() {

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

	




	scribo.AppView = Backbone.View.extend({

	    el: $('main'),

	    initialize: function() {

	    	// Create new collectino
		 	scribo.cards = new scribo.CardCollection();
		 	
	    	this.listenTo(scribo.cards, 'add', this.addOne);
			this.listenTo(scribo.cards, 'reset', this.addAll);

	 		scribo.cards.fetch({reset: true});

	 		this.$cards = this.$el.find('#cards');

	 		this.$cards.sortable();
			this.$cards.disableSelection();
	    },



	    events: {
	    	'click a.add-card' : 'addCard'
	    },
	    addCard: function(e) {
	    	e.preventDefault();
			scribo.cards.create();
	    },



		addOne: function (card) {
			var view = new scribo.CardItemView({ model: card });
			this.$cards.append(view.render().el);
		},

		// Add all items in the **Todos** collection at once.
		addAll: function () {
			scribo.cards.each(this.addOne, this);

			
		}
	}); 


	scribo.CardItemView = Backbone.View.extend({

		tagName: 'li',

		// className: function() {
		// 	return 'card style-' + this.model.get('color');
		// },

		className: 'card',

		template: _.template( $('#card-template').html() ),

		render: function() {

	 		this.$el.html(this.template(this.model.toJSON()));

	 		this.$input = this.$el.find('textarea');

	 		// needed this when class was a function
	 		// style now moved to wrapper class
	 		// this.$el.attr('class', _.result(this, 'className'));


	 		return this;
		},

		initialize: function(){

			 this.listenTo(this.model, 'destroy', this.remove);
			 this.listenTo(this.model, 'change', this.render);
			
  
		},

		events: {
			'keyup textarea' : 'textareaKeyup',
			'click a.delete-card' : 'deleteCard',
			'click a.set-card-style' : 'setCardStyle'
		},

		textareaKeyup : function(e) {
			
			var val = this.$input.val();
			if (val) {
				this.model.save({'text': val});
			}
		},

		deleteCard: function(e) {
			e.preventDefault();
			this.model.destroy();
		},


		setCardStyle: function(e) {
			e.preventDefault();
			// could also do set here - then save elsewere?
			// or throttle saves somehow?
			this.model.save('color', $(e.target).attr('href'));

		}

	});

	new scribo.AppView();

	
});