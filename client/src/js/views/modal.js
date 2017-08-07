var scribo = scribo || {};
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

});