var scribo = scribo || {};

scribo.AppView = Backbone.View.extend({

    el: $('main'),

    initialize: function() {

    	// Create new collection
	 	scribo.cards = new scribo.CardCollection();
	 	
    	this.listenTo(scribo.cards, 'add', this.addOne);
		this.listenTo(scribo.cards, 'reset', this.addAll);

 		scribo.cards.fetch({reset: true});

 		this.$cards = this.$el.find('#cards');

 		this.makeSortable();
 		this.addNav();
    },

    makeSortable: function() {   	
    	var el = document.getElementById('cards');
		var sortable = Sortable.create(el, {
			animation: 300, 
			draggable: "li.card",
			handle: ".front", // only sort from front
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
		var view = new scribo.CardView({ model: card });
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
		this.$el.append(nav.render().el);
	}
}); 
