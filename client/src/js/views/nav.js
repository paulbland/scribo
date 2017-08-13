var scribo = scribo || {};
scribo.templates = scribo.templates || {};
scribo.userProfile = scribo.userProfile || {};

scribo.NavView = Backbone.View.extend({

	tagName: 'nav',

	initialize: function() {
		this.setBodyClasses();
	},

	render: function() { 
 		this.$el.html(scribo.templates.nav({
			userProfile : scribo.userProfile,	// remember you can pass model here!
			userPrefs 	: this.model.toJSON(),		// this is it!
			userOptions : this.userOptions
		 }));	
 		return this;
	},

	userOptions: {
		theme 		: ['modern', 'classic', 'bright'],
		background 	: ['light', 'dark', 'image'],
		zoom 		: ['small', 'medium', 'large'],
		orientation : ['portrait', 'landscape'],
	},	

	setBodyClasses: function() {
		for (var key in this.userOptions) {
			$('body').addClass(key+'-'+this.model.attributes[key]);
		 }
	},

	// changeInput: function(e) {
	// 	console.log('thos');
	// 	console.log(e);

	// },

	events: {

		'click .toggle' :  function(e) {
			e.preventDefault();
			$('body').toggleClass('nav-open');
		},

		// 'change input' : 'changeInput',

		'change input[name="theme"]' : function(e) {
			var val = $(e.target).val();
			$('body').toggleClass('theme-modern', val === "modern");
			$('body').toggleClass('theme-classic', val === "classic");
			$('body').toggleClass('theme-bright', val === "bright");
			this.model.set({'theme' : val});
			this.model.save();
		},

		'change input[name="background"]' : function(e) {
			var val = $(e.target).val();
			$('body').toggleClass('background-light', val === "light");
			$('body').toggleClass('background-dark', val === "dark");
			$('body').toggleClass('background-image', val === "image");
			this.model.set({'background' : val});
			this.model.save();
		},

		'change input[name="zoom"]' : function(e) {
			var val = $(e.target).val();
			$('body').toggleClass('zoom-small', val === "small");
			$('body').toggleClass('zoom-medium', val === "medium");
			$('body').toggleClass('zoom-large', val === "large");
			this.model.set({'zoom' : val});
			this.model.save();
		},

		'change input[name="orientation"]' : function(e) {
			var val = $(e.target).val();
			$('body').toggleClass('orientation-portrait',  val === "portrait");
			$('body').toggleClass('orientation-landscape', val === "landscape");
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