var express     = require('express');
var { expressjwt: jwt } = require("express-jwt");
var Card        = require('./models/card');
var UserPrefs   = require('./models/userprefs');
var OpenAI      = require('openai');
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
    .post(async(req, res) => {
        
        // create a new instance of the Card model
        var card = new Card();      

        // set the cards info (comes from the request)
        card.userID  = req.auth.sub; 
        card.color  = req.body.color; 
        card.text   = req.body.text; 
        card.order  = req.body.order;

        // save the card and check for errors
        try {
            await card.save();
            res.json(card);
        } catch (err) {
            // res.send(err);
        }

        // paul did this. this sused to return a message. now returns 
        // card - so bcakboen knows the id, and can update it
        //res.json({ message: 'Card created!' });
    })

    // get all the cards (accessed at GET http://localhost:8080/api/cards)
    // i added a sort fn
    .get(async(req, res) => {

        // i am working here
        // need some data taht i can use as user id to pass to the find function
        // i have req.auth.stuff
        //id is not unqire for an email address
        // also - how do i get user email here??
        // its in the token.... 
        //console.log('userID: ' + req.auth.sub);

        try {
            const cards = await Card.find({
                    userID: req.auth.sub
                })
                .sort({
                    order: 1
                });
            res.json(cards);
        } catch (err) {
            // res.send(err)
        }
    });

router.route('/cards/:card_id')

    // get the card with that id (accessed at GET http://localhost:8080/api/cards/:card_id)
    .get(async(req, res) => {
        try {
            const card = await Card.findById(req.params.card_id);
            res.json(card);
        } catch (err) {
            // res.send(err);
        }
    })

    .put(async(req, res) => {

        try {
            // use our card model to find the card we want
            const card = await Card.findById(req.params.card_id);

            // update the cards info
            card.color  = req.body.color; 
            card.text   = req.body.text;  
            card.order  = req.body.order;  

            try {
                await card.save(); // save the card
                res.json({ message: 'Card updated!' });
            } catch (err) {
                // res.send(err);
            }
        } catch (err) {
            // res.send(err);
        }
    })
    .delete(async(req, res) => {
        try {
            const card = await Card.deleteOne({
                _id: req.params.card_id
            });
            res.json({ message: 'Successfully deleted' });
        } catch (err) {
            // res.send(err);
        }
    });

router.route('/userprefs')
    .post(async(req, res) => {
        
        var userPrefs = new UserPrefs();      

        userPrefs.userID        = req.auth.sub; 
        userPrefs.theme         = req.body.theme; 
        userPrefs.background    = req.body.background; 
        userPrefs.zoom          = req.body.zoom;  
        userPrefs.orientation   = req.body.orientation;  
        
        try {
            await userPrefs.save();
            res.json(userPrefs);
        } catch (err) {
            // res.send(err);
        }
    })
    .get(async (req, res) => {
        try {
            const cards = await UserPrefs.find({
                    userID: req.auth.sub
                })
                .limit(1);
            res.json(cards);
        } catch (err) {
            // res.send(err);
        }
    });

router.route('/userprefs/:userprefs_id')

    // get the card with that id (accessed at GET http://localhost:8080/api/cards/:card_id)
    .get(async (req, res) => {
        try {
            const userprefs = await UserPrefs.findById(req.params.userprefs_id);
            res.json(userprefs);
        } catch (err) {
            // res.send(err);
        }
    })
    .put(async(req, res) => {

        try {
            // use our card model to find the card we want
            userprefs = await UserPrefs.findById(req.params.userprefs_id);

            // update the cards info
            userprefs.theme         = req.body.theme; 
            userprefs.background    = req.body.background;  
            userprefs.zoom          = req.body.zoom;  
            userprefs.orientation   = req.body.orientation;  
            
            // save the card
            try {
                await userprefs.save();
                res.json({ message: 'userprefs updated!' });
            } catch (err) {
                // res.send(err);
            }
        } catch (err) {
            // res.send(err);
        }
    });
 
router.route('/ai-suggest')
    .post((req, res) => {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_SECRET_KEY
        });
        async function main() {
            const chatCompletion = await openai.chat.completions.create({
                messages: [{
                        role: 'system',
                        content: 'You are giving screenwriting outline suggestions. Suggest the next single plot point in 15 words or fewer, for a given set of existing plot points'
                    },
                    {
                        role: 'user',
                        content: req.body.plotPoints
                    }
                ],
                model: 'gpt-4-turbo',
                temperature: 1
            });
            res.json({
                suggestedText: chatCompletion.choices[0].message.content
            });
        }
        main();
    })

module.exports = router;
