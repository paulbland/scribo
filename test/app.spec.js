var expect = require("chai").expect;
var cardModel = require("../api/models/card.js");
var userPrefsModel = require("../api/models/userprefs.js");

describe("Models", function() {
    it("cardModel is a function", function() {
        expect(cardModel).to.be.a('function');
    });
    it("userPrefsModel is a function", function() {
        expect(userPrefsModel).to.be.a('function');
    })
});