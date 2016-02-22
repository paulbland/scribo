
$(function() {

	var currentZIndex = 0;

	//$('card').draggable();

	// $('card').on('mousedown', function() {
	// 	$(this).css('zIndex', ++currentZIndex);
	// 	$('nav').css('zIndex', (currentZIndex+1));
	// 	$('.status').css('zIndex', (currentZIndex+2));
	// });

	$('nav').on('click', function() {
		$('body').addClass('nav-open')
	})

	$('main').on('click', function() {
		$('body').removeClass('nav-open')
	})


	$('[name="theme"]').on('change', function(e) {

		$('body').toggleClass('modern', $(e.target).val() === "modern");
		$('body').toggleClass('classic', $(e.target).val() === "classic");
	})




})
