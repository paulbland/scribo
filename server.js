var express = require('express');
var app = express();

// from new tutorial
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// nwe db stuff
var mongoose   = require('mongoose');
mongoose.connect('scribo:69Sal6Iab4SWc9D@ds015398.mongolab.com:15398/scribo'); // connect to our database


// new bears
var Bear     = require('./app/models/bear');



/// i added this
// from here http://www.codexpedia.com/node-js/node-js-basic-auth-in-express-js/
// and also npom install basic-autth
// woo
var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === 'paul' && user.pass === 'scribo825') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}








// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', auth, function(req, res) {

    // ejs render automatically looks in the views folder
    //res.render('index');
    res.sendFile(__dirname + '/views/index.html');
});









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

router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    })

    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


app.use('/api', router);








app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

