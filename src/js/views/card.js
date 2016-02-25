
var scribo = scribo || {};
scribo.config = scribo.config || {};


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
		'click a.set-card-style' 	: 'setCardStyle',
		'click a.flip-card'			: 'flipCard'
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

	flipCard: function(e) {
		$(e.target).closest('.wrapper').toggleClass('flipped');
	},

	throttledSave: _.throttle(function() {
		this.model.save();
	}, scribo.config.autosave_ms)

});