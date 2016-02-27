var scribo = scribo || {};
scribo.templates = scribo.templates || {};


scribo.NavView = Backbone.View.extend({

	tagName: 'nav',

	render: function() { 
 		this.$el.html(scribo.templates.nav());	// remember you can pass model here!
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