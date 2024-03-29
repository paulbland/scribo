var scribo = scribo || {};
scribo.templates = scribo.templates || {};

import modalTemplate from '../../templates/modal.hbs';
scribo.templates.modal = modalTemplate;

export default Backbone.View.extend({

    tagName 	: 'div',
    className 	: 'modal modal-1',
    
	render: function() { 
        //console.log('running render');
 		this.$el.html(scribo.templates.modal({}));	
 		return this;
    },
    
    events: {
		'click a.close-modal' : 'closeModal',
		'click a.show-modal' : 'showModal'
    },

    showModal: function(e) {
        e.preventDefault();
        this.$el.removeClass('modal-1 modal-2 modal-3 modal-4');
        this.$el.addClass('modal-' + $(e.target).data('modal'));
    },
    
    closeModal: function(e) {
        e.preventDefault();
        localStorage.setItem('seenModal', true);
        this.remove();
    }

});