
// code below taken from here http://www.codexpedia.com/node-js/node-js-basic-auth-in-express-js/
// also requires npm install basic-autth

module.exports = (function() {

	var basicAuth = require('basic-auth');

	var auth = function (req, res, next) {
	  var user = basicAuth(req);
	  if (!user || !user.name || !user.pass) {
	    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
	    res.sendStatus(401);
	    return;
	  }
	  if (user.name === 'scribo' && user.pass === process.env.BASIC_AUTH_PW) {
	    next();
	  } else {
	    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
	    res.sendStatus(401);
	    return;
	  }
	};

	return auth;

})();