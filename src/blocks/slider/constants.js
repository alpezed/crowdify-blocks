/**
 * These are the block we'll allow to be inserted
 * as a slide.
 */
export const ALLOWED_BLOCKS = [ 'crowdify/slide' ];

/**
 * This is the default block we'll use for our slide.
 */
export const DEFAULT_BLOCK = 'crowdify/slide';

/**
 * These are the attributes we assign for our DEFAULT_BLOCK.
 */
export const DEFAULT_BLOCK_ATTRIBUTES = {
	align: 'center',
	className: 'swiper-slide',
	contentPosition: 'bottom left',
	customOverlayColor: '#000000',
	dimRatio: 20,
	layout: {
		type: 'constrained',
	},
	style: {
		color: {
			text: '#ffffff',
		},
		elements: {
			heading: {
				color: {
					text: '#ffffff',
				},
			},
			link: {
				color: {
					text: '#ffffff',
				},
			},
		},
		spacing: {
			padding: {
				top: 'var:preset|spacing|large',
				bottom: 'var:preset|spacing|large',
				left: 'var:preset|spacing|large',
				right: 'var:preset|spacing|large',
			},
		},
	},
};

/**
 * These are the default inner blocks we'll use
 * when our DEFAULT_BLOCK is inserted.
 */
export const DEFAULT_INNERBLOCK = 'core/paragraph';

/**
 * These are the attributes we assign for our default
 * inner blocks.
 */
export const DEFAULT_INNERBLOCK_ATTRIBUTES = {
	fontSize: 'large',
	style: {
		color: {
			text: '#ffffff',
		},
	},
};

/**
 * Some default Unsplash images...
 * (feel free to replace)
 */
export const PLACEHOLDER_IMG_1 = 'https://source.unsplash.com/kdl8xDDD6iA';
export const PLACEHOLDER_IMG_2 = 'https://source.unsplash.com/cRUZICCU_Xg';
export const PLACEHOLDER_IMG_3 = 'https://source.unsplash.com/lUF3cqG6n7s';

export const SLIDE_TEMPLATE = [
	[
		'crowdify/slide',
		{
			className: 'swiper-slide',
		},
	],
	[
		'crowdify/slide',
		{
			className: 'swiper-slide',
		},
	],
	[
		'crowdify/slide',
		{
			className: 'swiper-slide',
		},
	],
];
