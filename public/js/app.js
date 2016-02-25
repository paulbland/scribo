var scribo = scribo || {};
scribo.config = scribo.config || {};


scribo.config.autosave_ms = 5000;



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
	 		this.$nav = this.$el.find('#nav');

	 		this.makeSortable();

	 		this.addNav();
	    },

	    makeSortable: function() {

	    	this.$cards.sortable({
	 			cancel: '',
	 		}).on('click', function(e) {
	 			$(e.target).focus();

	 			// doesnt out cursor in correct position...

	 			// e.target.setSelectionRange(4, 4);
	 			// console.log(e.target.selectionEnd);
	 			// console.log(e.target.selectionStart);
	 		});
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

			
		},

		addNav: function() {
			// takes  a model
			// var nav = new scribo.NavView({ model: card });
			var nav = new scribo.NavView();
			this.$nav.append(nav.render().el);
	

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

		initialize: function() {
			 this.listenTo(this.model, 'destroy', this.remove);
			 this.listenTo(this.model, 'change:color', this.render);
			 this.listenTo(this.model, 'change:text', this.throttledSave);
		},

		events: {
			'keyup textarea' 			: 'updateCardText',
			'click a.delete-card' 		: 'deleteCard',
			'click a.set-card-style' 	: 'setCardStyle'
		},

		/**
		 * updates model but does not save - 
		 * the model set() will trigger change:text event
		 * which triggers throttledSave()  fn
		 */
		updateCardText : function() {
			// Want to save empty string if it exists
			var val = (this.$input.val()) ? this.$input.val() : '';
			this.model.set({'text': val});
		},

		deleteCard: function(e) {
			e.preventDefault();
			this.model.destroy();
		},

		setCardStyle: function(e) {
			e.preventDefault();
			this.model.save('color', $(e.target).attr('href'));
		},

		throttledSave: _.throttle(function() {
			this.model.save();
		}, scribo.config.autosave_ms)

	});









	scribo.NavView = Backbone.View.extend({

		// /tagName: 'nav',

		className: 'content',

		template: _.template( $('#nav-template').html() ),

		render: function() {

	 		// this.$el.html(this.template(this.model.toJSON()));
	 		this.$el.html(this.template());

	 		return this;
		},


		events : {

			'click .toggle' :  function() {
				$('body').toggleClass('nav-open');
			},

			'change input[name="theme"]' : function(e) {
				$('body').toggleClass('modern', $(e.target).val() === "modern");
				$('body').toggleClass('classic', $(e.target).val() === "classic");
			}

		}

	});



	new scribo.AppView();

	
});