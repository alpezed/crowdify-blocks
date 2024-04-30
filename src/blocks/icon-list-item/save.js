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

	const defaultIconName = !! iconName ? iconName : 'USE_PARENT_DEFAULT_ICON';
	const defaultHorizontalSpace = !! horizontalSpace
		? `${ horizontalSpace }px`
		: 'var(--cf-icon-list-default-h-space)';

	const blockProps = useBlockProps.save( {
		id: uniqueId,
		className: classnames( 'wp-block-crowdify-icon-list-item', {
			[ `wp-block-crowdify-icon-list-item-${ uniqueId }` ]: uniqueId,
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

	const paddingCss = generateResponsiveCSS(
		`[data-block="${ uniqueId }"]`,
		padding,
		'padding'
	);

	return (
		<>
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
			{ paddingCss }
		</>
	);
}
