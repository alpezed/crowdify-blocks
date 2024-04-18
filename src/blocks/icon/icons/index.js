import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

import defaultIcons from './untitled-ui';
import { TEXT_DOMAIN } from '../../../utils/text-domain';

const icons = [
	{
		isDefault: false,
		type: 'untitled-ui',
		title: __( 'Untitled UI', TEXT_DOMAIN ),
		icons: [].concat( defaultIcons ),
		categories: [
			{
				name: 'general',
				title: __( 'General', TEXT_DOMAIN ),
			},
			{
				name: 'layout',
				title: __( 'Layout', TEXT_DOMAIN ),
			},
			{
				name: 'development',
				title: __( 'Development', TEXT_DOMAIN ),
			},
			{
				name: 'charts',
				title: __( 'Charts', TEXT_DOMAIN ),
			},
			{
				name: 'media',
				title: __( 'Media & Devices', TEXT_DOMAIN ),
			},
		],
	},
];

export default function getIcons() {
	return applyFilters( 'crowdifyBlock.icons', icons );
}
