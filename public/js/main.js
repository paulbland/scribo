
$(function() {

	$('nav').on('click', function() {
		$('body').addClass('nav-open');
	});

	$('main').on('click', function() {
		$('body').removeClass('nav-open');
	});


	$('[name="theme"]').on('change', function(e) {

		$('body').toggleClass('modern', $(e.target).val() === "modern");
		$('body').toggleClass('classic', $(e.target).val() === "classic");
	});




});
