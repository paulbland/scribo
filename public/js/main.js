
$(function() {

	$('nav').on('click', function() {
		$('body').toggleClass('nav-open');
	});

	$('nav input[name="theme"]').on('change', function(e) {
		$('body').toggleClass('modern', $(e.target).val() === "modern");
		$('body').toggleClass('classic', $(e.target).val() === "classic");
	});




});
