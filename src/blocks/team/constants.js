export const DEFAULT_TEAM_TEMPLATE = [
	[
		'core/group',
		{
			layout: {
				type: 'flex',
				flexWrap: 'nowrap',
				justifyContent: 'center',
			},
			style: { spacing: { margin: { bottom: '2rem' } } },
		},
		[
			[
				'core/image',
				{
					width: '166px',
					height: '166px',
					scale: 'cover',
					sizeSlug: 'large',
					linkDestination: 'none',
					style: { border: { radius: '100px' } },
				},
			],
		],
	],
	[
		'core/group',
		{
			style: { spacing: { blockGap: 'var:preset|spacing|20' } },
			layout: {
				type: 'flex',
				orientation: 'vertical',
				justifyContent: 'center',
			},
		},
		[
			[
				'core/heading',
				{
					placeholder: 'Team Name',
					align: 'center',
					style: {
						typography: {
							fontStyle: 'normal',
							fontWeight: 600,
							fontSize: '22px',
						},
					},
				},
			],
			[
				'core/heading',
				{
					level: 3,
					placeholder: 'Position',
					align: 'center',
					style: {
						typography: {
							fontStyle: 'normal',
							fontWeight: '300',
							fontSize: '20px',
						},
						elements: {
							link: {
								color: { text: 'var:preset|color|primary' },
							},
						},
						spacing: {
							margin: { bottom: 'var:preset|spacing|20' },
						},
					},
					textColor: 'primary',
				},
			],
			[
				'core/paragraph',
				{
					placeholder: 'Description here...',
					align: 'center',
					textColor: 'text-gray',
					style: {
						layout: { selfStretch: 'fit', flexSize: null },
						spacing: {
							margin: { bottom: 'var:preset|spacing|30' },
						},
					},
				},
			],
			[
				'core/social-links',
				{
					iconColor: 'font',
					iconColorValue: '#fff',
					style: {
						spacing: {
							blockGap: { left: 'var:preset|spacing|20' },
						},
					},
					className: 'is-style-logos-only',
					layout: { type: 'flex', justifyContent: 'center' },
				},
				[
					[
						'core/social-link',
						{ url: '#', service: 'facebook', target: '_blank' },
					],
					[
						'core/social-link',
						{ url: '#', service: 'linkedin', target: '_blank' },
					],
					[
						'core/social-link',
						{ url: '#', service: 'dribbble', target: '_blank' },
					],
				],
			],
		],
	],
];

export const CLASSIC_TEAM_TEMPLATE = [
	[
		'core/group',
		{
			layout: {
				type: 'flex',
				flexWrap: 'nowrap',
			},
			style: { spacing: { margin: { bottom: '2rem' } } },
		},
		[
			[
				'core/image',
				{
					width: '500px',
					height: '300px',
					scale: 'cover',
					sizeSlug: 'large',
					linkDestination: 'none',
				},
			],
		],
	],
	[
		'core/group',
		{
			style: { spacing: { blockGap: 'var:preset|spacing|20' } },
			layout: {
				type: 'flex',
				orientation: 'vertical',
			},
		},
		[
			[
				'core/heading',
				{
					placeholder: 'Team Name',
					style: {
						typography: {
							fontStyle: 'normal',
							fontWeight: 600,
							fontSize: '22px',
						},
					},
				},
			],
			[
				'core/heading',
				{
					level: 3,
					placeholder: 'Position',
					style: {
						typography: {
							fontStyle: 'normal',
							fontWeight: '300',
							fontSize: '20px',
						},
						elements: {
							link: {
								color: { text: 'var:preset|color|primary' },
							},
						},
						spacing: {
							margin: { bottom: 'var:preset|spacing|20' },
						},
					},
					textColor: 'primary',
				},
			],
			[
				'core/paragraph',
				{
					placeholder: 'Description here...',
					textColor: 'text-gray',
					style: {
						layout: { selfStretch: 'fit', flexSize: null },
						spacing: {
							margin: { bottom: 'var:preset|spacing|30' },
						},
					},
				},
			],
			[
				'core/social-links',
				{
					iconColor: 'font',
					iconColorValue: '#fff',
					style: {
						spacing: {
							blockGap: { left: 'var:preset|spacing|20' },
						},
					},
					className: 'is-style-logos-only',
					layout: { type: 'flex' },
				},
				[
					[
						'core/social-link',
						{ url: '#', service: 'facebook', target: '_blank' },
					],
					[
						'core/social-link',
						{ url: '#', service: 'linkedin', target: '_blank' },
					],
					[
						'core/social-link',
						{ url: '#', service: 'dribbble', target: '_blank' },
					],
				],
			],
		],
	],
];
