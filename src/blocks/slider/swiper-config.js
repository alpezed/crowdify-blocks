/**
 * Define some defaults for Swiper.
 *
 * @see https://swiperjs.com/swiper-api#parameters
 */
export const swiperConfig = {
	// configure Swiper to use modules
	autoplay: true, // Automatically slide.
	// centeredSlides: true,
	direction: 'horizontal', // Horizontal slider.
	// effect: 'fade',
	grabCursor: true, // Show grab cursor for UI/UX.
	keyboard: true, // Enable keyboard navigation.
	loop: true, // Enable continuous loop mode.
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	on: {
		init() {
			// Feel free to remove (debug).
			console.log( 'Swiper initialized.' );
		},
	},
	pagination: {
		el: '.swiper-pagination',
	},
	slidesPerView: 1,
	speed: 300,
};
