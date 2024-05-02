/**
 * External dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';
import { counterIcon as icon } from '~/utils/block';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	icon: {
		src: icon,
		foreground: 'var(--crowdify-theme-color)',
	},
	edit: Edit,
} );
