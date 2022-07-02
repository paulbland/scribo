
var Handlebars = require('handlebars/runtime');

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
});

Handlebars.registerHelper('check_prop', function(a, b, c, opts) {
   if (a[b] === c) {
       return opts.fn(this);
   } else {
       return opts.inverse(this);
   }
});

Handlebars.registerHelper('first_to_upper', function(a, options) {
    return a.charAt(0).toUpperCase() + a.slice(1);
});

module.exports = Handlebars;
