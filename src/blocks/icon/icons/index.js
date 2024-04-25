import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

import defaultIcons from './untitled-ui';

const icons = [
	{
		isDefault: false,
		type: 'untitled-ui',
		title: __( 'Untitled UI', 'crowdify-blocks' ),
		icons: [].concat( defaultIcons ),
		categories: [
			{
				name: 'general',
				title: __( 'General', 'crowdify-blocks' ),
			},
			{
				name: 'layout',
				title: __( 'Layout', 'crowdify-blocks' ),
			},
			{
				name: 'development',
				title: __( 'Development', 'crowdify-blocks' ),
			},
			{
				name: 'charts',
				title: __( 'Charts', 'crowdify-blocks' ),
			},
			{
				name: 'media',
				title: __( 'Media & Devices', 'crowdify-blocks' ),
			},
		],
	},
];

export default function getIcons() {
	return applyFilters( 'crowdifyBlock.icons', icons );
}
