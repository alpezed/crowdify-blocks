/**
 * External Dependencies
 *
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 *
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { layout, align, verticalSpace } = attributes;

	return (
		<ul
			{ ...useBlockProps.save( {
				style: {
					gap: `${ verticalSpace }px`,
				},
				className: classnames( {
					[ `items-align-${ align }` ]: align,
					[ `is-${ layout }-layout` ]: layout,
				} ),
			} ) }
		>
			<InnerBlocks.Content />
		</ul>
	);
}
