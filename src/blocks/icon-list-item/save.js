/**
 * External Dependencies
 *
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { generateResponsiveCSS } from '~/utils/css';

export default function Save( { attributes } ) {
	const {
		uniqueId,
		padding,
		iconName,
		iconColor,
		iconColorValue,
		iconSize,
		horizontalSpace,
	} = attributes;

	const componentId = uniqueId?.substr( 0, 8 );

	const defaultIconName = !! iconName ? iconName : 'USE_PARENT_DEFAULT_ICON';
	const defaultHorizontalSpace = !! horizontalSpace
		? `${ horizontalSpace }px`
		: 'var(--cf-icon-list-default-h-space)';

	const blockProps = useBlockProps.save( {
		id: `list-item-${ componentId }`,
		className: classnames( 'wp-block-crowdify-icon-list-item', {
			[ `list-item-${ componentId }` ]: componentId,
		} ),
		style: {
			gap: defaultHorizontalSpace,
		},
	} );

	const iconStyle = {
		color: !! iconColorValue
			? iconColorValue
			: 'var(--cf-icon-list-default-icon-color)',
		fontSize: !! iconSize
			? `${ iconSize }px`
			: 'var(--cf-icon-list-default-icon-size)',
		strokeWidth: 'var(--cf-icon-list-icon-stroke-width)',
	};

	const iconClasses = classnames( 'list-item-icon', {
		[ `has-${ iconColor }-color` ]: iconColor,
	} );

	const elementId = `.wp-block-crowdify-icon-list-item.list-item-${ componentId }`;

	return (
		<>
			<style>
				{ generateResponsiveCSS( elementId, padding, 'padding' ) }
			</style>
			<li { ...blockProps }>
				{ !! defaultIconName && (
					<span
						className={ iconClasses }
						data-icon={ defaultIconName }
						style={ iconStyle }
					/>
				) }
				<RichText.Content
					tagName="span"
					className="list-item-text"
					value={ attributes.content }
				/>
			</li>
		</>
	);
}
