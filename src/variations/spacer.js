/**
 * Wordpress Dependencies
 *
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { CATEGORY } from '~/utils/constants';
import { CROWDIFY_SEPARATOR } from '~/constants/variation';
import { separatorIcon as icon } from '~/utils/block';

import './style.scss';

registerBlockVariation( 'core/separator', {
	name: CROWDIFY_SEPARATOR,
	icon: {
		src: icon,
		foreground: 'var(--crowdify-theme-color)',
	},
	title: __( 'Separator', 'crowdify-blocks' ),
	category: CATEGORY,
	attributes: {
		namespace: CROWDIFY_SEPARATOR,
	},
	isActive: [ 'namespace' ],
	scope: [ 'inserter', 'transform' ],
} );
