var scribo = scribo || {};
scribo.templates = scribo.templates || {};
scribo.userProfile = scribo.userProfile || {};

import myNav from 'handlebars-loader!../../templates/nav.hbs';
scribo.templates.nav = myNav;

module.exports = Backbone.View.extend({

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
		theme 		: ['classic', 'modern', 'bright'],
		background 	: ['light', 'dark', 'image'],
		zoom 		: ['small', 'medium', 'large'],
		orientation : ['portrait', 'landscape'],
	},	

	setBodyClasses: function() {
		for (var key in this.userOptions) {
			$('body').addClass(key+'-'+this.model.attributes[key]);
		 }
	},

	changeInput: function(e) {
		var key = e.target.name;
		var val = e.target.value;
		
		// Remove exisitng body classes with same key
		$('body').alterClass( key+'-*', '' );

		// Add body class
		$('body').addClass(key+'-'+val);

		// Update model and save
		this.model.set(key, val);
		this.model.save();
	}, 

	showModal: function(e) {
		e.preventDefault();
		var modal = new scribo.ModalView();
		$('main').append(modal.render().el);
	},

	events: {

		'click .toggle' :  function(e) {
			e.preventDefault();
			$('body').toggleClass('nav-open');
		},

		'change input' : 'changeInput',

		'click .show-modal' : 'showModal',

		'click .logout' : function(e) {
			e.preventDefault();
			if (confirm('Are you sure you wish to log out?')) {
				localStorage.removeItem('userToken');
          		localStorage.removeItem('userProfile');
          		window.location.href = "/";
			}
		},

		'click .download' : function(e) {
			e.preventDefault();
		
			var colors = {
				1 : 'yellow',
				2 : 'blue',
				3 : 'green',
				4 : 'red',
				5 : 'orange'
			};

			var cardText = scribo.cards.map(function(model) {
				var result = '';
				result += (scribo.cards.indexOf(model) + 1) + '. ';
				result +=  model.get('text'); 
				result += '\n\n\n(card color: '+ colors[model.get('color')] + ')';
				return result;
			});
			
			var date = new Date();
			var dateOptions = {  
    			weekday: "long", year: "numeric", month: "short",  
   				day: "numeric", hour: "2-digit", minute: "2-digit"  
			};  

			prependText = '\n\n===\n\nTotal: '+ scribo.cards.length + ' cards';
			prependText += '\nDownloaded on: '+ date.toLocaleTimeString("en-us", dateOptions) + '\n';
			
			var downloadLink = "data:application/octet-stream," + encodeURIComponent(cardText.join("\n\n---\n\n") + prependText);

			this.$el.append('<a id="my_link" href="'+downloadLink+'" download="scribo-cards-'+date.yyyymmdd()+'.txt"></a>');
			$('#my_link')[0].click();
			$('#my_link').remove();

		}
	}

});


// From: https://gist.github.com/peteboere/1517285

(function ( $ ) {
	
$.fn.alterClass = function ( removals, additions ) {
	
	var self = this;
	
	if ( removals.indexOf( '*' ) === -1 ) {
		// Use native jQuery methods if there is no wildcard matching
		self.removeClass( removals );
		return !additions ? self : self.addClass( additions );
	}

	var patt = new RegExp( '\\s' + 
			removals.
				replace( /\*/g, '[A-Za-z0-9-_]+' ).
				split( ' ' ).
				join( '\\s|\\s' ) + 
			'\\s', 'g' );

	self.each( function ( i, it ) {
		var cn = ' ' + it.className + ' ';
		while ( patt.test( cn ) ) {
			cn = cn.replace( patt, ' ' );
		}
		it.className = $.trim( cn );
	});

	return !additions ? self : self.addClass( additions );
};

})( jQuery );


// From: https://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
// *Edited slightly

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};
