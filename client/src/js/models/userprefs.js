var scribo = scribo || {};

scribo.UserPrefsModel = Backbone.Model.extend({

	defaults : {
		theme       : 'classic',
		background  : 'dark',
        zoom        : 'medium',
        orientation : 'landscape'
    },
    
	idAttribute: '_id',

	urlRoot: '/api/userprefs'
	
});
