this["scribo"] = this["scribo"] || {};
this["scribo"]["templates"] = this["scribo"]["templates"] || {};

this["scribo"]["templates"]["card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "flipped";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "				\n					<li class=\"card-style-"
    + alias2(alias1(depth0, depth0))
    + "\">\n						<label>\n							<input type=\"radio\" name=\"card_style\" value=\""
    + alias2(alias1(depth0, depth0))
    + "\" "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || helpers.helperMissing).call(depth0 != null ? depth0 : {},((stack1 = (depths[1] != null ? depths[1].card : depths[1])) != null ? stack1.color : stack1),depth0,{"name":"if_eq","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >\n							<span></span>\n						</label>\n					</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : {};

  return "<div class=\"wrapper style-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.color : stack1), depth0))
    + " "
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.isFlipped : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n	<div class=\"front\">\n		<textarea placeholder=\"Type here...\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.card : depth0)) != null ? stack1.text : stack1), depth0))
    + "</textarea>\n		<a class=\"flip-card\"></a>\n	</div>\n	<div class=\"back\">\n		\n	 	<a href=\"#\" class=\"delete-card\">delete card🗑✘</a><br />\n\n	 	Select color: \n		<form>\n			<ul class=\"card-style\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.cardStyles : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</form>\n	\n	</div>\n</div>	";
},"useData":true,"useDepths":true});

this["scribo"]["templates"]["nav"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#\" class=\"toggle\"></a>\n<form>\n	<fieldset>\n		<legend>Theme</legend>\n		<label><input type=\"radio\" name=\"theme\" value=\"classic\"> Classic</label>\n		<label><input type=\"radio\" name=\"theme\" value=\"modern\" checked> Modern</label>\n	</fieldset>\n</form>";
},"useData":true});