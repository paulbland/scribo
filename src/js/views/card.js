
var scribo = scribo || {};
scribo.config = scribo.config || {};


scribo.CardView = Backbone.View.extend({

	tagName: 'li',

	// className: function() {
	// 	return 'card style-' + this.model.get('color');
	// },

	className: 'card',

	cardStyles: [1,2,3,4,5],

	isFlipped: false,

    template : Handlebars.compile( $('#card-template').html() ),

	render: function() {
		console.log('render: scribo.CardView');

 		this.$el.html(this.template({
 			card 		: this.model.toJSON(),
 			isFlipped 	: this.isFlipped,
 			cardStyles 	: this.cardStyles
 		}));

 		this.$input = this.$el.find('textarea');
 		this.$wrapper = this.$el.find('.wrapper');

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
		'keyup textarea' 					: 'updateCardText',
		'click a.delete-card' 				: 'deleteCard',
		'change input[name="card_style"]' 	: 'setCardStyle',
		'click a.flip-card'					: 'flipCard'
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
		this.model.save('color', $(e.target).val());
	},

	flipCard: function(e) {
		this.isFlipped = !this.isFlipped;
		this.$wrapper.toggleClass('flipped', this.isFlipped);
	},

	throttledSave: _.throttle(function() {
		this.model.save();
	}, scribo.config.autosave_ms)

});