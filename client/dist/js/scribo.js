this["scribo"] = this["scribo"] || {};
this["scribo"]["templates"] = this["scribo"]["templates"] || {};

this["scribo"]["templates"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "flipped";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li class=\"card-style-"
    + alias2(alias1(depth0, depth0))
    + "\">\r\n						<label>\r\n							<input type=\"radio\" name=\"card_style\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\" "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? depths[1].card : depths[1])) != null ? stack1.color : stack1),depth0,{"name":"if_eq","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >\r\n							<span></span>\r\n						</label>\r\n					</li>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"wrapper style-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.color : stack1), depth0))
    + " "
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.isFlipped : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n	<div class=\"front\">\r\n		<textarea placeholder=\"Type here...\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.text : stack1), depth0))
    + "</textarea>\r\n		<a class=\"flip-card\"></a>\r\n	</div>\r\n	<div class=\"back\">\r\n		Select color:\r\n		<form>\r\n			<ul class=\"card-style\">\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.cardStyles : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\r\n		</form>\r\n		<a href=\"#\" class=\"delete-card\">Delete card</a><br />\r\n		<a class=\"flip-card\"></a>\r\n	</div>\r\n</div>	";
},"useData":true,"useDepths":true});

this["scribo"]["templates"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p><strong>Welcome to Scribo. The index card app for writers.</strong></p>\r\n<p>&middot; Click the \" + \" to create a new card</p>\r\n<p>&middot; Click the \"<span class=\"icon\">⤿</span>\" for card options</p>\r\n<p>&middot; Drag to reorder the cards</p>\r\n<p>&middot; Cards are automatically saved</p>\r\n<p>Important: This is beta software. Things may break. Please don't make this the only copy of your precious work.</p>\r\n<p>And please let us know what you think <a href=\"mailto:feedback@scribo.co.\">feedback@scribo.co</a>.</p>\r\n<p><a href=\"#\" class=\"close-modal\">Ok, got it</a></p>";
},"useData":true});

this["scribo"]["templates"]["nav"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<a href=\"#\" class=\"toggle\"></a>\r\n<div class=\"nav-content\">\r\n	Logged in as "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.userProfile : depth0)) != null ? stack1.name : stack1), depth0))
    + "<br />\r\n	<br />\r\n	<form>\r\n		<fieldset>\r\n			<legend>Theme</legend>\r\n			<label><input type=\"radio\" name=\"theme\" value=\"classic\" checked> Classic</label>\r\n			<label><input type=\"radio\" name=\"theme\" value=\"modern\"> Modern</label>\r\n		</fieldset>\r\n	</form>\r\n	<br /> \r\n	<br />\r\n	<a href=\"#\" class=\"logout\">Logout</a>\r\n</div>";
},"useData":true});;var scribo = scribo || {};

$(function() { 
	new scribo.AppView();
});;var scribo = scribo || {};
scribo.config = scribo.config || {};


scribo.config.autosave_ms = 5000;

;Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});
;var scribo = scribo || {};

scribo.CardModel = Backbone.Model.extend({

	defaults : {
		color: 1,
		text: '',
		order: 0
	},

	idAttribute: '_id',
});

scribo.CardCollection = Backbone.Collection.extend({
  	model: scribo.CardModel,
  	url: '/api/cards'
});
;var scribo = scribo || {};
scribo.userProfile = scribo.userProfile || {};

scribo.AppView = Backbone.View.extend({

    el: $('main'),

    initialize: function() {
        _.bindAll(this, 'updateOrder');

        this.doAuth();

        // Create new collection
        scribo.cards = new scribo.CardCollection();
        
        this.listenTo(scribo.cards, 'add', this.addOne);
        this.listenTo(scribo.cards, 'reset', this.addAll);

        scribo.cards.fetch({reset: true});

        this.$cards = this.$el.find('#cards');

        this.makeSortable(); 		
        this.addNav();

        if (!localStorage.getItem('seenModal')) {
            this.addModal();
        }
    },
        
    events: {
        'click a.add-card' : 'addCard'
    },

    makeSortable: function() {   	
        var el = document.getElementById('cards');
        var sortable = Sortable.create(el, {
            animation : 300, 
            draggable : "li.card",
            handle 		: ".front",
            onEnd 		: this.updateOrder
        });
    },

    updateOrder: function(e) {
        // 'this' context missing - fixed with _.bindAll() in init
        this.$cards.find('li.card').each(function(index, value) {
                var model = scribo.cards.get($(value).data('id'));
                model.save('order', (index + 1));
        }); 
    },

    addCard: function(e) {
        e.preventDefault(); 
        scribo.cards.create();
    },

	addOne: function (card) {
		var view = new scribo.CardView({ model: card });
		this.$cards.append(view.render().el);
	},

	// Add all items in the **Todos** collection at once.
	addAll: function () {
		scribo.cards.each(this.addOne, this);
	},

	addNav: function() {
		// takes a model
		// var nav = new scribo.NavView({ model: card });
		var nav = new scribo.NavView();
		this.$el.append(nav.render().el);
	},

	addModal: function() {
		var modal = new scribo.ModalView();
		this.$el.append(modal.render().el);
    },
    
	doAuth: function() {
		scribo.userProfile = JSON.parse(localStorage.getItem('userProfile'));
		if (! scribo.userProfile) {
		  window.location.href = "/";
		}

		$.ajaxSetup({
			'beforeSend': function(xhr) {
				if (localStorage.getItem('userToken')) {
					xhr.setRequestHeader('Authorization',
						'Bearer ' + localStorage.getItem('userToken'));
				}
			}
		});
	}
}); 
;var scribo = scribo || {};
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
		if (confirm('Are you sure you wish to delete this card?')) {
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

});;var scribo = scribo || {};
scribo.templates = scribo.templates || {};


scribo.ModalView = Backbone.View.extend({

    tagName 	: 'div',
    className 	: 'modal',
    
	render: function() { 
 		this.$el.html(scribo.templates.modal({}));	
 		return this;
    },
    
    events: {
		'click a.close-modal' : 'closeModal'
    },
    
    closeModal: function(e) {
        e.preventDefault();
        localStorage.setItem('seenModal', true);
        this.remove();
    }

});;var scribo = scribo || {};
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