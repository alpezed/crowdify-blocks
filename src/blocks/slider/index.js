/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { sliderIcon } from '../../utils/block';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	icon: {
		src: sliderIcon,
		foreground: 'var(--crowdify-theme-color)',
	},
	edit: Edit,
	save,
} );
