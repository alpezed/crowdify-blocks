/**
 * Wordpress Dependencies
 *
 */
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { postCategories as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { TEXT_DOMAIN } from '../../utils/text-domain';

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
	save: Save,
} );

const CROWDIFY_POSTS = 'crowdify/posts';

registerBlockVariation( 'core/query', {
	name: CROWDIFY_POSTS,
	title: __( 'Posts', TEXT_DOMAIN ),
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
