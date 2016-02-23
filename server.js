var express = require('express');
var app = express();



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

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

