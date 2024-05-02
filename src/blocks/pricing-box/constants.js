const PRICING_HEADING = [
	'core/group',
	{
		style: { spacing: { blockGap: 'var:preset|spacing|20' } },
		layout: { type: 'flex', orientation: 'vertical' },
	},
	[
		[
			'core/heading',
			{
				content: 'LEVEL 1 (1 MINUTE)',
				style: {
					elements: {
						link: {
							color: {
								text: 'var:preset|color|blue-500',
							},
						},
					},
					typography: { fontSize: '18px' },
				},
				textColor: 'blue-500',
			},
		],
		[
			'core/paragraph',
			{
				content:
					'Approx. 1 Reel / YouTube Short per Week - Up to 4 Reels per Month or Equivalent',
				style: { typography: { fontSize: '16px' } },
			},
		],
	],
];

const PRICING_SEPARATOR = [
	'core/separator',
	{
		backgroundColor: 'light-gray',
		className: 'crowdify-separator-203b5992',
		namespace: 'crowdify/separator',
		uniqueId: 'core-separator-e04ac8a1',
		width: { desktop: '40px', mobile: '45px', tablet: '50px' },
		horizontalAlignment: {
			desktop: 'left',
			tablet: 'left',
			mobile: 'left',
		},
	},
];

const PRICING_PRICE = [
	'core/group',
	{
		style: { spacing: { blockGap: '2px' } },
		layout: { type: 'flex', orientation: 'vertical' },
	},
	[
		[
			'core/heading',
			{
				content: '$250 AUD',
				style: {
					typography: { fontSize: '28px' },
					elements: {
						link: { color: { text: 'var:preset|color|font' } },
					},
				},
				textColor: 'font',
			},
		],
		[
			'core/paragraph',
			{
				content: 'PER MONTH',
				style: {
					typography: {
						fontSize: '14px',
						fontStyle: 'normal',
						fontWeight: '600',
					},
				},
			},
		],
	],
];

const PRICING_FEATURES = [
	'crowdify/icon-list',
	{
		iconColor: 'blue-500',
		iconColorValue: '#2E90FA',
		horizontalSpace: 10,
		verticalSpace: 16,
		iconVerticalPosition: { desktop: '3px' },
		iconVerticalAlign: { desktop: 'start' },
		style: {
			elements: {
				link: { color: { text: 'var:preset|color|text-gray' } },
			},
			typography: { lineHeight: '1.6' },
			spacing: { margin: { bottom: 'var:preset|spacing|50' } },
		},
		textColor: 'text-gray',
		uniqueId: 'crowdify-icon-list-13099f81',
	},
	[
		[
			'crowdify/icon-list-item',
			{
				uniqueId: 'crowdify-icon-list-item-b2c8fe91',
				content:
					'Suitable for individuals who require 1 reel for week for their social Media',
				padding: {
					desktop: {
						top: '66px',
						bottom: '89px',
						left: '86px',
						right: '133px',
					},
				},
			},
		],
		[
			'crowdify/icon-list-item',
			{
				uniqueId: 'crowdify-icon-list-item-73521934',
				content: 'Consistent weekly Reels to engage your audience.',
			},
		],
		[
			'crowdify/icon-list-item',
			{
				uniqueId: 'crowdify-icon-list-item-b3e18e64',
				content:
					'Thoughtfully curated content for regular interaction.',
			},
		],
	],
];

const PRICING_BUTTON = [
	'core/buttons',
	{},
	[
		[
			'core/button',
			{
				text: 'Subscribe',
				width: 100,
				style: {
					spacing: { padding: { top: '12px', bottom: '12px' } },
					typography: { fontSize: '16px' },
				},
			},
		],
	],
];

export const DEFAULT_PRICING_TEMPLATE = [
	[
		'core/group',
		{
			metadata: {
				name: 'Pricing',
			},
			style: {
				spacing: {
					padding: {
						top: '40px',
						bottom: '40px',
						left: '40px',
						right: '40px',
					},
					blockGap: '20px',
				},
				border: { radius: '12px' },
				elements: {
					link: { color: { text: 'var:preset|color|text-gray' } },
				},
				typography: { fontSize: '16px' },
			},
			backgroundColor: 'dark-gray',
			textColor: 'text-gray',
			layout: { type: 'constrained', justifyContent: 'left' },
		},
		[
			PRICING_HEADING,
			PRICING_SEPARATOR,
			PRICING_PRICE,
			PRICING_FEATURES,
			PRICING_BUTTON,
		],
	],
];
