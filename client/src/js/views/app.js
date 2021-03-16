var scribo = scribo || {};
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

        var self = this;
        scribo.cards.fetch({reset: true}).then(function() {
            // if no cards, add one
            if (scribo.cards.length === 0) {
                self.addCard();
            }
        });
        
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
            if (typeof $(value).data('id') !== 'undefined') {
                var model = scribo.cards.get($(value).data('id'));
                model.save('order', (index + 1));
               // model.destroy();
            }
        }); 
    },

    addCard: function(e) {
        if (e) e.preventDefault(); 
        var self = this;
        scribo.cards.create({}, {
            wait: true,
            success: function(model, response) {
                self.$cards.find('li.card').last().data('id', response._id); // find last element and set id to value returned from api 
                // ^^ feel like this should be easier or automatic...
                model.save('order', scribo.cards.length); // udpate order just for this card (with the total length of collection)
            }
        });
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
        var self = this;
        
        // new user prefs
        var userPrefs = new scribo.UserPrefsModel({userID: scribo.userProfile.user_id});

        userPrefs.fetch().then(function() {

            // get get user id from first one. becausae weird thigns are happening. now get the model again:

            if (typeof userPrefs.attributes[0] !== 'undefined') {
                // existing user
                var userPrefs2 = new scribo.UserPrefsModel({_id: userPrefs.attributes[0]._id});
                userPrefs2.fetch().then(function() {
                    //console.log('userPrefs2', userPrefs2);
                    var nav = new scribo.NavView({model: userPrefs2});
                    self.$el.append(nav.render().el);
                });
            } else {
                // new user
                var nav = new scribo.NavView({model: userPrefs});
                self.$el.append(nav.render().el);
            }

            // if an entry is returned, then set its id (so we dont create multiples)
            // if (typeof userPrefs.attributes[0] !== 'undefined') {
            //     userPrefs.set('_id', userPrefs.attributes[0]._id);
            // }
        });	
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
