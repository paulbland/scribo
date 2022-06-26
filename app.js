var express 	= require('express');
var mongoose 	= require('mongoose');
var compression = require('compression');
var router 		= require('./api/router');
var favicon 	= require('serve-favicon');
var sslRedirect = require('heroku-ssl-redirect');

var app 		= express();

// enable ssl redirect
app.use(sslRedirect());

// SET PORT
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// FAVICON
app.use(favicon(__dirname + '/client/dist/img/favicon.ico'));

// DATASBASE
//mongoose.connect(process.env.PROD_MONGODB); // connect to our database
var promise = mongoose.connect(process.env.PROD_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

// BASIC AUTH
var basicAuth = require('./api/auth');

// GZIP COMPRESSION
app.use(compression());

// from new tutorial
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// VIEW ENGINE AND FOLDER
app.set('view engine', 'ejs');
app.set('views',__dirname + '/api/views');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/client/dist'));

// HOMEPAGE
//app.get('/', basicAuth, function(req, res) {
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/privacy', function(req, res) {
    res.render('privacy');
});

app.get('/terms', function(req, res) {
    res.render('terms');
});

// set the home page route (with basic auth)
app.get('/app', function(req, res) {
    res.render('app');
});

// SET ROUTER TO USE api/
app.use('/api', router);

app.listen(port, function() {
    console.log('Scribo is running on http://localhost:' + port);
});
