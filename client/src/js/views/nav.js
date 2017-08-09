var scribo = scribo || {};
scribo.templates = scribo.templates || {};
scribo.userProfile = scribo.userProfile || {};


scribo.NavView = Backbone.View.extend({

	tagName: 'nav',

	render: function() { 
 		this.$el.html(scribo.templates.nav({
 			userProfile: scribo.userProfile			// remember you can pass model here!
 		}));	
 		return this;
	},

	events: {

		'click .toggle' :  function(e) {
			e.preventDefault();
			$('body').toggleClass('nav-open');
		},

		'change input[name="theme"]' : function(e) {
			$('body').toggleClass('modern', $(e.target).val() === "modern");
			$('body').toggleClass('classic', $(e.target).val() === "classic");
			$('body').toggleClass('bright', $(e.target).val() === "bright");
		},

		'change input[name="zoom"]' : function(e) {
			$('body').toggleClass('zoom-sm', $(e.target).val() === "sm");
			$('body').toggleClass('zoom-md', $(e.target).val() === "md");
			$('body').toggleClass('zoom-lg', $(e.target).val() === "lg");
		},

		'change input[name="orientation"]' : function(e) {
			$('body').toggleClass('portrait', $(e.target).val() === "portrait");
			$('body').toggleClass('landscape', $(e.target).val() === "landscape");
		},

		'click .logout' : function(e) {
			e.preventDefault();
			if (confirm('Are you sure you wish to log out?')) {
				localStorage.removeItem('userToken');
          		localStorage.removeItem('userProfile');
          		window.location.href = "/";
			}
		}
	}

});