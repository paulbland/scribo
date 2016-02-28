// api/models/card.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CardSchema   = new Schema({
    color: Number,
    text: String,
    order: Number
});

module.exports = mongoose.model('Card', CardSchema);