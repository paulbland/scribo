var scribo = scribo || {};
scribo.templates = scribo.templates || {};
scribo.userProfile = scribo.userProfile || {};

scribo.NavView = Backbone.View.extend({

	tagName: 'nav',

	render: function() { 
 		this.$el.html(scribo.templates.nav({
			 userProfile: scribo.userProfile,	// remember you can pass model here!
			 userPrefs: this.model.toJSON()		// this is it!
		 }));	
 		return this;
	},

	events: {

		'click .toggle' :  function(e) {
			e.preventDefault();
			$('body').toggleClass('nav-open');
		},

		'change input[name="theme"]' : function(e) {
			var val = $(e.target).val();
			$('body').toggleClass('modern', val === "modern");
			$('body').toggleClass('classic', val === "classic");
			$('body').toggleClass('bright', val === "bright");
			this.model.set({'theme' : val});
			this.model.save();
		},

		'change input[name="background"]' : function(e) {
			var val = $(e.target).val();
			$('body').toggleClass('light', val === "light");
			$('body').toggleClass('dark', val === "dark");
			$('body').toggleClass('image', val === "image");
			this.model.set({'background' : val});
			this.model.save();
		},

		'change input[name="zoom"]' : function(e) {
			var val = $(e.target).val();
			$('body').toggleClass('zoom-sm', val === "sm");
			$('body').toggleClass('zoom-md', val === "md");
			$('body').toggleClass('zoom-lg', val === "lg");
			this.model.set({'zoom' : val});
			this.model.save();
		},

		'change input[name="orientation"]' : function(e) {
			var val = $(e.target).val();
			$('body').toggleClass('portrait',  val === "portrait");
			$('body').toggleClass('landscape', val === "landscape");
			this.model.set({'orientation' : val});
			this.model.save();
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