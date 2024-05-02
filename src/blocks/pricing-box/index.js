/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Import styles
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { pricingIcon as icon } from '~/utils/block';

registerBlockType( metadata.name, {
	icon: {
		src: icon,
		foreground: 'var(--crowdify-theme-color)',
	},
	edit: Edit,
	save,
} );
