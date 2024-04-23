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
import { CATEGORY, TEXT_DOMAIN } from '../utils/constants';

import './style.scss';

const CROWDIFY_POSTS = 'crowdify/posts';

registerBlockVariation( 'core/query', {
	name: CROWDIFY_POSTS,
	icon,
	title: __( 'Posts', TEXT_DOMAIN ),
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
