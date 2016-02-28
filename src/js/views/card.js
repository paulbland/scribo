var scribo = scribo || {};
scribo.config = scribo.config || {};
scribo.templates = scribo.templates || {};


scribo.CardView = Backbone.View.extend({

	tagName 	: 'li',
	className 	: 'card',
	cardStyles 	: [1,2,3,4,5],
	isFlipped	: false,

	attributes : function() {
		return {
			"data-id" : this.model.id
		};
	},

	render: function() {

 		this.$el.html(scribo.templates.card({
 			card 		: this.model.toJSON(),
 			isFlipped 	: this.isFlipped,
 			cardStyles 	: this.cardStyles
 		}));

 		this.$input 	= this.$el.find('textarea');
 		this.$wrapper 	= this.$el.find('.wrapper');

 		return this;
	},

	initialize: function() {
		 this.listenTo(this.model, 'destroy', this.remove);
		 this.listenTo(this.model, 'change:color', this.render);
		 this.listenTo(this.model, 'change:text', this.delayedSave);
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
	 * which triggers throttledSave() fn
	 */
	updateCardText : function() {
		// Want to save empty string if it exists
		var val = (this.$input.val()) ? this.$input.val() : '';
		this.model.set({'text': val});
	},

	deleteCard: function(e) {
		e.preventDefault();
		if (confirm('Are you sure?')) {
			this.model.destroy();
		}
	},

	setCardStyle: function(e) {
		this.model.save('color', $(e.target).val());
	},

	flipCard: function(e) {
		this.isFlipped = !this.isFlipped;
		this.$wrapper.toggleClass('flipped', this.isFlipped);
	},

	delayedSave: _.debounce(function() {
		this.model.save();
	}, scribo.config.autosave_ms)

});