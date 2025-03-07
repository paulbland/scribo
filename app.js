var express 	= require('express');
var mongoose 	= require('mongoose');
var compression = require('compression');
var router 		= require('./api/router');
var favicon 	= require('serve-favicon');
var sslRedirect = require('heroku-ssl-redirect').default;
var app 		= express();
var path 		= require('path');
var cors        = require('cors');
var helmet      = require('helmet');

app.use(sslRedirect()); 
app.use(helmet({contentSecurityPolicy: false}));
app.use(favicon(path.join(__dirname, '/client/dist/img/favicon.ico')));

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

mongoose.connect(process.env.PROD_MONGODB);

app.use(compression()); // GZIP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/api/views'));

app.use(express.static(path.join(__dirname, '/client/dist'))); // public directory for assets (css/js/img)

app.get('/', (req, res) => res.render('index'));
app.get('/app', (req, res) => res.render('app'));
app.get('/privacy', (req, res) => res.render('privacy'));
app.get('/terms', (req, res) => res.render('terms'));

// SET ROUTER TO USE api/
app.use('/api', router);

var port = process.env.PORT || 8080; // Port set by Heroku
app.listen(port, () => console.log('Scrībō is running on http://localhost:' + port));
