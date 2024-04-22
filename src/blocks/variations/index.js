import { registerBlockVariation } from '@wordpress/blocks';
import { TEXT_DOMAIN } from '../../utils/text-domain';

alert( 'ok' );

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
