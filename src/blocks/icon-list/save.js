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
	const {
		layout,
		align,
		iconColorValue,
		iconSize,
		iconLineWidth,
		horizontalSpace,
		verticalSpace,
	} = attributes;

	return (
		<ul
			{ ...useBlockProps.save( {
				style: {
					'--cf-icon-list-default-icon-color': iconColorValue,
					'--cf-icon-list-default-icon-size': iconSize,
					'--cf-icon-list-icon-stroke-width': iconLineWidth,
					'--cf-icon-list-default-h-space': `${ horizontalSpace }px`,
					gap: verticalSpace ? `${ verticalSpace }px` : undefined,
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
