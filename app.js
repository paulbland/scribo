var express 	= require('express');
var mongoose 	= require('mongoose');
var compression = require('compression');
var router 		= require('./api/router');
var favicon 	= require('serve-favicon');
var sslRedirect = require('heroku-ssl-redirect');
// var basicAuth = require('./api/auth');
var app 		= express();
var path 		= require('path');
var cors        = require('cors');

app.use(sslRedirect()); 
app.use(favicon(path.join(__dirname, '/client/dist/img/favicon.ico')));
app.use(cors());

mongoose.connect(process.env.PROD_MONGODB);

app.use(compression()); // GZIP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/api/views'));

app.use(express.static(path.join(__dirname, '/client/dist'))); // public directory for assets (css/js/img)

app.get('/', /* basicAuth, */ (req, res) => res.render('index'));
app.get('/app', (req, res) => res.render('app'));
app.get('/privacy', (req, res) => res.render('privacy'));
app.get('/terms', (req, res) => res.render('terms'));

// SET ROUTER TO USE api/
app.use('/api', router);

var port = process.env.PORT || 8080; // Port set by Heroku
app.listen(port, () => console.log('Scrībō is running on http://localhost:' + port));
