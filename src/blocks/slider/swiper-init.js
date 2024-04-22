/**
 * Swiper dependencies
 *
 * @see https://swiperjs.com/get-started
 */
import { Swiper } from 'swiper';
import {
	Autoplay,
	EffectFade,
	EffectFlip,
	EffectCube,
	EffectCreative,
	Keyboard,
	Navigation,
	Pagination,
} from 'swiper/modules';

/**
 * Initialize the slider.
 *
 * @param {Element} container HTMLElement.
 * @param {Object}  options   Slider parameters.
 *
 * @return {Object} Returns initialized slider instance.
 *
 * @see https://swiperjs.com/swiper-api#parameters
 */
export function SwiperInit( container, options = {} ) {
	const parameters = {
		autoplay: options?.autoplay ?? true,
		centeredSlides: options?.centerSlides ?? false,
		createElements: true,
		grabCursor: options?.grabCursor ?? true,
		initialSlide: 0,
		keyboard: true,
		modules: [
			Autoplay,
			Keyboard,
			Navigation,
			Pagination,
			EffectFade,
			EffectFlip,
			EffectCube,
			EffectCreative,
		],
		navigation: options?.navigation ?? false,
		pagination: options?.pagination ?? false,
		// pagination: {
		// 	el: '.swiper-custom-pagination',
		// 	type: 'bullets',
		// 	clickable: true,
		// },
		simulateTouch: options?.simulateTouch ?? true,
		...options,
	};

	if ( options?.effect === 'fade' ) {
		parameters.fadeEffect = {
			crossFade: true,
		};
	}

	if ( options?.effect === 'cube' ) {
		parameters.cubeEffect = {
			shadow: true,
			slideShadows: true,
			shadowOffset: 20,
			shadowScale: 0.94,
		};
	}

	if ( options?.effect === 'creative' ) {
		parameters.creativeEffect = {
			prev: {
				shadow: true,
				translate: [ 0, 0, -400 ],
			},
			next: {
				translate: [ '100%', 0, 0 ],
			},
		};
	}

	return new Swiper( container, parameters );
}
