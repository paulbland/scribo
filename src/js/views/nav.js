var scribo = scribo || {};



scribo.NavView = Backbone.View.extend({

	tagName: 'nav',

    template : Handlebars.compile( $('#nav-template').html() ),

	render: function() {

		// removed - no model here
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