/**
 * Wordpress Dependencies
 *
 */
import { registerBlockType } from '@wordpress/blocks';
import { postCategories as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
} );
