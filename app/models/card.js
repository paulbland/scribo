// app/models/card.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CardSchema   = new Schema({
    // name: String
    color: Number,
    text: String
});

module.exports = mongoose.model('Card', CardSchema);