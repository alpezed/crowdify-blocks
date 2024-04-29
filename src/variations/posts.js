/**
 * Wordpress Dependencies
 *
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { customPostType as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { CATEGORY } from '../utils/constants';
import { CROWDIFY_POSTS } from '~/constants/variation';

import './style.scss';

registerBlockVariation( 'core/query', {
	name: CROWDIFY_POSTS,
	icon,
	title: __( 'Posts', 'crowdify-blocks' ),
	category: CATEGORY,
	attributes: {
		namespace: CROWDIFY_POSTS,
		showFilter: {
			type: 'number',
			default: true,
		},
	},
	isActive: [ 'namespace' ],
	scope: [ 'inserter', 'transform' ],
} );
