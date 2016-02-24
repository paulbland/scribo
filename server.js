var express = require('express');
var app = express();

// from new tutorial
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// nwe db stuff
var mongoose   = require('mongoose');
mongoose.connect('scribo:69Sal6Iab4SWc9D@ds015398.mongolab.com:15398/scribo'); // connect to our database




var auth     = require('./api/auth');

// var basicAuth = require('basic-auth');

// var auth = function (req, res, next) {
//   var user = basicAuth(req);
//   if (!user || !user.name || !user.pass) {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//     res.sendStatus(401);
//     return;
//   }
//   if (user.name === 'paul' && user.pass === 'scribo825') {
//     next();
//   } else {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//     res.sendStatus(401);
//     return;
//   }
// };


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
    res.sendFile(__dirname + '/public/index.html');
});





// router in its own thing

var router     = require('./api/router');

app.use('/api', router);








app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

