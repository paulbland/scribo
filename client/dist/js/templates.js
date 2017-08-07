this["scribo"] = this["scribo"] || {};
this["scribo"]["templates"] = this["scribo"]["templates"] || {};

this["scribo"]["templates"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "flipped";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li class=\"card-style-"
    + alias2(alias1(depth0, depth0))
    + "\">\r\n						<label>\r\n							<input type=\"radio\" name=\"card_style\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\" "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? depths[1].card : depths[1])) != null ? stack1.color : stack1),depth0,{"name":"if_eq","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >\r\n							<span></span>\r\n						</label>\r\n					</li>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"wrapper style-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.color : stack1), depth0))
    + " "
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.isFlipped : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n	<div class=\"front\">\r\n		<textarea placeholder=\"Type here...\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.text : stack1), depth0))
    + "</textarea>\r\n		<a class=\"flip-card\"></a>\r\n	</div>\r\n	<div class=\"back\">\r\n		Select color:\r\n		<form>\r\n			<ul class=\"card-style\">\r\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.cardStyles : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\r\n		</form>\r\n		<a href=\"#\" class=\"delete-card\">Delete card</a><br />\r\n		<a class=\"flip-card\"></a>\r\n	</div>\r\n</div>	";
},"useData":true,"useDepths":true});

this["scribo"]["templates"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p><strong>Welcome to Scribo. The index card app for writers.</strong></p>\r\n<p>&middot; Click the \" + \" to create a new card</p>\r\n<p>&middot; Click the \"<span class=\"icon\">⤿</span>\" for card options</p>\r\n<p>&middot; Drag to reorder the cards</p>\r\n<p>&middot; Cards are automatically saved</p>\r\n<p>Important: This is beta software. Things may break. Please don't make this the only copy of your precious work.</p>\r\n<p>And please let us know what you think <a href=\"mailto:feedback@scribo.co.\">feedback@scribo.co</a>.</p>\r\n<p><a href=\"#\" class=\"close-modal\">Ok, got it</a></p>";
},"useData":true});

this["scribo"]["templates"]["nav"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<a href=\"#\" class=\"toggle\"></a>\r\n<div class=\"nav-content\">\r\n	Logged in as "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.userProfile : depth0)) != null ? stack1.name : stack1), depth0))
    + "<br />\r\n	<br />\r\n	<form>\r\n		<fieldset>\r\n			<legend>Theme</legend>\r\n			<label><input type=\"radio\" name=\"theme\" value=\"classic\" checked> Classic</label>\r\n			<label><input type=\"radio\" name=\"theme\" value=\"modern\"> Modern</label>\r\n		</fieldset>\r\n	</form>\r\n	<br /> \r\n	<br />\r\n	<a href=\"#\" class=\"logout\">Logout</a>\r\n</div>";
},"useData":true});