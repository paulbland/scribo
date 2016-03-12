var express 	= require('express');
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var compression = require('compression');
var router 		= require('./api/router');

var app 		= express();




// from new tutorial
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DATASBASE
mongoose.connect('scribo:69Sal6Iab4SWc9D@ds015398.mongolab.com:15398/scribo'); // connect to our database

// BASIC AUTH
//var auth = require('./api/auth');

// GZIP COMPRESSION
app.use(compression());


// SET PORT
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


// VIEW ENGINE AND FOLDER
app.set('view engine', 'ejs');
app.set('views',__dirname + '/api/views');


// SSL 
app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://' + req.headers.host + req.path);
    }
    else {
        return next();
    }
});


// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/dist'));

// set the home page route (with basic auth)
//app.get('/app', auth, function(req, res) {
app.get('/app', function(req, res) {
    res.render('app');
});

// testing my facebook login page (mayget removed with passportjs/etc)
app.get('/fb_login', function(req, res) {
    res.render('fb_login');
});

// new homepage with auth0
app.get('/', function(req, res) {
    res.render('index');
});





// router in its own thing

app.use('/api', router);











app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

