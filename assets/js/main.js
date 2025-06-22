/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

	// Smooth scrolling for experience page navigation.
		$body.on('click', 'a[href*="experience.html#"]', function(event) {
			
			event.preventDefault();
			
			var href = $(this).attr('href');
			var targetId = href.split('#')[1];
			
			// Navigate to experience.html with target as URL parameter
			window.location.href = 'experience.html?scroll=' + targetId;
		});

	// Handle smooth scrolling on experience page load
		$(document).ready(function() {
			// Check if we're on experience page and have a scroll parameter
			if (window.location.pathname.includes('experience.html')) {
				var urlParams = new URLSearchParams(window.location.search);
				var targetId = urlParams.get('scroll');
				
				if (targetId) {
					// Wait a bit for page to fully load, then animate
					setTimeout(function() {
						// First scroll to top
						$('html, body').animate({
							scrollTop: 0
						}, 800, function() {
							// Then scroll to target section
							var targetElement = $('#' + targetId);
							if (targetElement.length) {
								$('html, body').animate({
									scrollTop: targetElement.offset().top - 100
								}, 1000);
							}
						});
					}, 300);
				}
			}
		});

	// Smooth scrolling for section navigation buttons on experience page
		$body.on('click', '.section-nav a[href^="#"]', function(event) {
			event.preventDefault();
			
			var targetId = $(this).attr('href').substring(1);
			var targetElement = $('#' + targetId);
			
			if (targetElement.length) {
				$('html, body').animate({
					scrollTop: targetElement.offset().top - 100
				}, 1000);
			}
		});

})(jQuery);