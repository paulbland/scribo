var express     = require('express');
var { expressjwt: jwt } = require("express-jwt");
var Card        = require('./models/card');
var UserPrefs   = require('./models/userprefs');
var router      = express.Router(); 


// Set up JST on all router
router.use(jwt({
    secret: Buffer.from(process.env.AUTH_CLIENT_SECRET, 'base64'),
    audience: process.env.AUTH_CLIENT_ID,
    algorithms: ['HS256']
}));


// middleware to use for all requests
router.use(function(req, res, next) {
   // console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


router.route('/cards')

    // create a card (accessed at POST http://localhost:8080/api/cards)
    .post(function(req, res) {
        
        // create a new instance of the Card model
        var card = new Card();      

        // set the cards info (comes from the request)
        card.userID  = req.auth.sub; 
        card.color  = req.body.color; 
        card.text   = req.body.text; 
        card.order  = req.body.order;

        // save the card and check for errors
        card.save(function(err) {
            if (err) {
                res.send(err);
            }

            // paul did this. this sused to return a message. now returns 
            // card - so bcakboen knows the id, and can update it
            //res.json({ message: 'Card created!' });
            res.json(card);
        });
        
    })

    // get all the cards (accessed at GET http://localhost:8080/api/cards)
    // i added a sort fn
    .get(function(req, res) {

        // i am working here
        // need some data taht i can use as user id to pass to the find function
        // i have req.auth.stuff
        //id is not unqire for an email address
        // also - how do i get user email here??
        // its in the token.... 
        //console.log('userID: ' + req.auth.sub);


        Card.find({
            userID: req.auth.sub
        }).sort({'order' : 1}).exec(function(err, cards) {
            if (err) {
                res.send(err);
            }
            res.json(cards);
        }); 
    });

router.route('/cards/:card_id')

    // get the card with that id (accessed at GET http://localhost:8080/api/cards/:card_id)
    .get(function(req, res) {
        Card.findById(req.params.card_id, function(err, card) {
            if (err) {
                res.send(err);
            }
            res.json(card);
        });
    })

    .put(function(req, res) {

        // use our card model to find the card we want
        Card.findById(req.params.card_id, function(err, card) {

            if (err) {
                res.send(err); 
            }

            // update the cards info
            card.color  = req.body.color; 
            card.text   = req.body.text;  
            card.order  = req.body.order;  

            // save the card
            card.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'Card updated!' });
            });

        }); 
    })

     .delete(function(req, res) {
        Card.deleteOne({
            _id: req.params.card_id
        }, function(err, card) {
            if (err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted' });
        });
    });

router.route('/userprefs')
    
    .post(function(req, res) {
        
        var userPrefs = new UserPrefs();      

        userPrefs.userID        = req.auth.sub; 
        userPrefs.theme         = req.body.theme; 
        userPrefs.background    = req.body.background; 
        userPrefs.zoom          = req.body.zoom;  
        userPrefs.orientation   = req.body.orientation;  
        
        userPrefs.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json(userPrefs);
        });
        
    })

    .get(function(req, res) {

        UserPrefs.find({
            userID: req.auth.sub
        }).
        limit(1).
        exec(function(err, cards) {
            if (err) {
                res.send(err);
            }
            res.json(cards);
        }); 
    });

router.route('/userprefs/:userprefs_id')


    // get the card with that id (accessed at GET http://localhost:8080/api/cards/:card_id)
    .get(function(req, res) {
        UserPrefs.findById(req.params.userprefs_id, function(err, userprefs) {
            if (err) {
                res.send(err);
            }
            res.json(userprefs);
        });
    })
          
    .put(function(req, res) {

        // use our card model to find the card we want
        UserPrefs.findById(req.params.userprefs_id, function(err, userprefs) {

            if (err) {
                res.send(err); 
            }

            // update the cards info
            userprefs.theme         = req.body.theme; 
            userprefs.background    = req.body.background;  
            userprefs.zoom          = req.body.zoom;  
            userprefs.orientation   = req.body.orientation;  
            
            // save the card
            userprefs.save(function(err) {
                if (err) {
                    res.send(err);
                }

                res.json({ message: 'userprefs updated!' });
            });

        }); 
    });
 

module.exports = router;

