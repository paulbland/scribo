


/// i added this
// from here http://www.codexpedia.com/node-js/node-js-basic-auth-in-express-js/
// and also npom install basic-autth
// woo

module.exports = (function() {

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
	};

	return auth;

})();