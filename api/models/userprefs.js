// api/models/userprefs.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserPrefsSchema   = new Schema({
	userID: String,
    theme: String,
    background: String,
    zoom: String,
    orientation: String
});

module.exports = mongoose.model('UserPrefs', UserPrefsSchema);