var scribo = scribo || {};
scribo.templates = scribo.templates || {};



scribo.NavView = Backbone.View.extend({

	tagName: 'nav',

	render: function() {
		// remember you can pass model here
 		this.$el.html(scribo.templates.nav());
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