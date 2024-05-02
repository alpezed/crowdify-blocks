/**
 * Wordpress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Import Styles
 */
import './editor.scss';

/**
 * Internal dependencies
 */
import { DEFAULT_PRICING_TEMPLATE } from './constants';

export default function Edit() {
	return (
		<div { ...useBlockProps() }>
			<InnerBlocks template={ DEFAULT_PRICING_TEMPLATE } />
		</div>
	);
}
