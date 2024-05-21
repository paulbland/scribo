var express 	= require('express');
var mongoose 	= require('mongoose');
var compression = require('compression');
var router 		= require('./api/router');
var favicon 	= require('serve-favicon');
var sslRedirect = require('heroku-ssl-redirect');
// var basicAuth = require('./api/auth');
var app 		= express();

app.use(sslRedirect()); 
app.use(favicon(__dirname + '/client/dist/img/favicon.ico'));

mongoose.set('strictQuery', false);
var promise = mongoose.connect(process.env.PROD_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(compression()); // GZIP
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views',__dirname + '/api/views');

app.use(express.static(__dirname + '/client/dist')); // public directory for assets (css/js/img)

app.get('/', /* basicAuth, */ (req, res) => res.render('index'));
app.get('/app', (req, res) => res.render('app'));
app.get('/privacy', (req, res) => res.render('privacy'));
app.get('/terms', (req, res) => res.render('terms'));

// SET ROUTER TO USE api/
app.use('/api', router);

var port = process.env.PORT || 8080; // Port set by Heroku
app.listen(port, function() {
    console.log('Scribo is running on http://localhost:' + port);
});
