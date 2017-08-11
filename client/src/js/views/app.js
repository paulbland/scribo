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

        scribo.cards.fetch({reset: true});
        

       
        
        this.$cards = this.$el.find('#cards');

        this.makeSortable(); 		
        this.addNav();

        if (!localStorage.getItem('seenModal')) {
            this.addModal();
        }

        // if no cards, add one
        // if (scribo.cards.length === 0) {
        //     scribo.cards.create();
        // }
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
        
        // new user prefs
        var userPrefs = new scribo.UserPrefsModel({userID: scribo.userProfile.user_id});

        userPrefs.fetch({
            /* userID: scribo.userProfile.user_id, */
            success: function() {
                // if an entry is returned, then set its id (so we dont create multiples)
                if (typeof userPrefs.attributes[0] !== 'undefined') {
                    userPrefs.set('_id', userPrefs.attributes[0]._id);
                    // this will change isnEw() to false and then future uodartes will use PUT
                    // instead of post and not make dulicates
                    // i guess i can ssave here.. but dont need to. it will save when its changed
                    // userPrefs.save().then(function() {
                    //     console.log('userPrefs.isNew() after save:', userPrefs.isNew());
                    // });
                }
            }
        });

       
         
		var nav = new scribo.NavView({model: userPrefs});
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
