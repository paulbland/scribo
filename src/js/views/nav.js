var scribo = scribo || {};
scribo.templates = scribo.templates || {};
scribo.userProfile = scribo.userProfile || {};


scribo.NavView = Backbone.View.extend({

	tagName: 'nav',

	render: function() { 
 		this.$el.html(scribo.templates.nav({userProfile: scribo.userProfile}));	// remember you can pass model here!
 		return this;
	},

	events: {

		'click .toggle' :  function() {
			$('body').toggleClass('nav-open');
		},

		'change input[name="theme"]' : function(e) {
			$('body').toggleClass('modern', $(e.target).val() === "modern");
			$('body').toggleClass('classic', $(e.target).val() === "classic");
		},

		'click .logout' : function(e) {
			e.preventDefault();
          	localStorage.removeItem('userToken');
          	localStorage.removeItem('userProfile');
          	window.location.href = "/";
		}
	}

});