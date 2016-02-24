var express = require('express');

// new cards
var Card     = require('./models/card');




// this is new - for the api

var router = express.Router(); 

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/cards')

    // create a card (accessed at POST http://localhost:8080/api/cards)
    .post(function(req, res) {
        
        var card = new Card();      // create a new instance of the Card model
       // card.name = req.body.name;  // set the cards name (comes from the request)
        card.color = req.body.color;  // set the cards name (comes from the request)
        card.text = req.body.text;  // set the cards name (comes from the request)

        // save the card and check for errors
        card.save(function(err) {
            if (err)
                res.send(err);

            // paul did this. this sused to return a message. now returns 
            // card - so bcakboen knows the id, and can update it
            //res.json({ message: 'Card created!' });
            res.json(card);
        });
        
    })

    // get all the cards (accessed at GET http://localhost:8080/api/cards)
    .get(function(req, res) {
        Card.find(function(err, cards) {
            if (err)
                res.send(err);

            res.json(cards);
        });
    });

router.route('/cards/:card_id')

    // get the card with that id (accessed at GET http://localhost:8080/api/cards/:card_id)
    .get(function(req, res) {
        Card.findById(req.params.card_id, function(err, card) {
            if (err)
                res.send(err);
            res.json(card);
        });
    })

    .put(function(req, res) {

        // use our card model to find the card we want
        Card.findById(req.params.card_id, function(err, card) {

            if (err)
                res.send(err); 

            //card.name = req.body.name;  // update the cards info
            card.color = req.body.color;  // update the cards info
            card.text = req.body.text;  // update the cards info

            // save the card
            card.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Card updated!' });
            });

        }); 
    })

     .delete(function(req, res) {
        Card.remove({
            _id: req.params.card_id
        }, function(err, card) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



  module.exports = router;

