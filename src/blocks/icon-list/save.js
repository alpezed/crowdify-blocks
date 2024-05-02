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
import { generateResponsiveCSS2 } from '~/utils/css';

export default function save( { attributes } ) {
	const {
		layout,
		align,
		uniqueId,
		iconColorValue,
		iconSize,
		iconLineWidth,
		horizontalSpace,
		verticalSpace,
		iconVerticalPosition,
		iconVerticalAlign,
		iconHorizontalAlign,
	} = attributes;

	const targetIconElement = `.${ uniqueId } .list-item-icon`;
	const targetListElement = `.${ uniqueId } .wp-block-crowdify-icon-list-item`;

	return (
		<>
			<style>
				{ generateResponsiveCSS2( targetIconElement, {
					top: iconVerticalPosition,
				} ) }
				{ generateResponsiveCSS2( targetListElement, {
					'align-items': iconVerticalAlign,
					'justify-content': iconHorizontalAlign,
				} ) }
			</style>
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
						[ uniqueId ]: uniqueId,
					} ),
				} ) }
			>
				<InnerBlocks.Content />
			</ul>
		</>
	);
}
