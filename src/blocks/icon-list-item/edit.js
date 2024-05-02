/**
 * External Dependencies
 *
 */
import classnames from 'classnames';

/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
	ContrastChecker,
	withColors,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown, // eslint-disable-line
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients, // eslint-disable-line
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';

/**
 * Import styles
 *
 */
import './editor.scss';

/**
 * Internal Dependencies
 */
import { useIcon } from '~/hooks/use-icon';
import { IconControl } from '~/components';
// import { generateResponsiveCSS } from '~/utils/css';

/**
 * Renders the Edit component.
 *
 * @param {Object} props - The props object containing attributes, setAttributes, and context.
 * @return {JSX.Element} The JSX element representing the Edit component.
 */
function Edit( props ) {
	const {
		clientId,
		attributes,
		iconColor,
		setAttributes,
		context,
		setIconColor,
	} = props;
	const {
		icon,
		uniqueId,
		iconSize,
		content,
		placeholder,
		iconColorValue,
		horizontalSpace,
	} = attributes;
	const {
		icon: fallbackIcon,
		horizontalSpace: parentHorizontalSpace,
		iconSize: fallbackIconSize,
		iconColor: fallbackIconColor,
		iconColorValue: fallbackIconColorValue,
		iconLineWidth: fallbackIconLineWidth,
	} = context;

	const { icon: printedIcon } = useIcon( {
		iconName: icon,
		fallbackIcon,
	} );

	let hSpace;
	if ( iconSize ) {
		hSpace = `${ horizontalSpace }px`;
	} else if ( parentHorizontalSpace ) {
		hSpace = `${ parentHorizontalSpace }px`;
	} else {
		hSpace = undefined;
	}

	const componentId = uniqueId?.substr( 0, 8 );

	const blockProps = useBlockProps( {
		style: {
			gap: hSpace,
		},
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		className: classnames( blockProps.className, {
			[ `list-item-${ componentId }` ]: componentId,
		} ),
		renderAppender: false,
		__unstableDisableDropZone: true,
	} );

	useEffect( () => {
		setAttributes( { uniqueId: clientId } );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ clientId ] );

	const themeIconColor = iconColor ?? fallbackIconColor;
	const iconClasses = classnames( 'list-item-icon', {
		'has-icon-color': iconColorValue || fallbackIconColorValue,
		[ `has-${ themeIconColor?.slug }-color` ]: themeIconColor,
	} );

	let size;
	if ( iconSize ) {
		size = `${ iconSize }px`;
	} else if ( fallbackIconSize ) {
		size = `${ fallbackIconSize }px`;
	} else {
		size = undefined;
	}

	const iconStyle = {
		fontSize: size,
		color: !! iconColorValue ? iconColorValue : fallbackIconColorValue,
		strokeWidth: fallbackIconLineWidth,
	};

	const colorSettings = [
		{
			colorLabel: __( 'Icon color', 'crowdify-blocks' ),
			colorValue: iconColor.color || iconColorValue,
			onChange: ( colorValue ) => {
				setIconColor( colorValue );
				setAttributes( {
					iconColorValue: colorValue,
				} );
			},
			resetAllFilter: () => {
				setIconColor( undefined );
				setAttributes( { iconColorValue: undefined } );
			},
		},
	];

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	// In WordPress <=6.2 this will return null, so default to true in those cases.
	const hasColorsOrGradients =
		colorGradientSettings?.hasColorsOrGradients ?? true;

	const inspectorControls = (
		<>
			<InspectorControls __experimentalToggleGroupControlOptionIcon>
				<PanelBody title={ __( 'Settings' ) }>
					<RangeControl
						allowReset
						label={ __( 'Horizontal Spacing', 'crowdify-blocks' ) }
						value={ horizontalSpace }
						initialPosition={ 50 }
						max={ 100 }
						min={ 0 }
						onChange={ ( value ) =>
							setAttributes( { horizontalSpace: value } )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Icon Settings' ) }>
					<IconControl
						value={ icon }
						label={ __( 'Icon', 'crowdify-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { icon: value } )
						}
					/>
					{ /* <ResponsiveBoxControl
						value={ padding }
						label={ __( 'Padding', 'crowdify-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { padding: value } )
						}
					/> */ }
					<RangeControl
						label={ __( 'Icon Size', 'crowdify-blocks' ) }
						value={ iconSize }
						allowReset
						initialPosition={ 50 }
						max={ 300 }
						min={ 0 }
						onChange={ ( value ) =>
							setAttributes( { iconSize: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			{ hasColorsOrGradients && (
				<InspectorControls group="color">
					{ colorSettings.map(
						( {
							colorLabel,
							colorValue,
							colorGradientValue,
							onChange,
							onGradientChange,
							resetAllFilter,
						} ) => (
							<ColorGradientSettingsDropdown
								key={ `icon-list-color-${ colorLabel }` }
								__experimentalIsRenderedInSidebar
								settings={ [
									{
										label: colorLabel,
										colorValue,
										gradientValue: colorGradientValue,
										onColorChange: onChange,
										onGradientChange,
										isShownByDefault: true,
										resetAllFilter,
										enableAlpha: true,
									},
								] }
								panelId={ clientId }
								{ ...colorGradientSettings }
							/>
						)
					) }
					<ContrastChecker
						{ ...{
							textColor: iconColorValue,
							// backgroundColor: iconBackgroundColorValue,
						} }
						isLargeText={ false }
					/>
				</InspectorControls>
			) }
		</>
	);

	// const targetElement = `[data-block="${ clientId }"]`;

	return (
		<>
			{ inspectorControls }
			<style>
				{ /* { generateResponsiveCSS( targetElement, padding, 'padding' ) } */ }
			</style>
			<li { ...innerBlocksProps }>
				{ icon || fallbackIcon ? (
					<span className={ iconClasses } style={ iconStyle }>
						{ printedIcon }
					</span>
				) : null }
				<RichText
					identifier="content"
					tagName="div"
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
					className="list-item-text"
					value={ content }
					aria-label={ __( 'List text' ) }
					placeholder={ placeholder || __( 'List' ) }
				/>
			</li>
		</>
	);
}

const iconColorAttributes = {
	iconColor: 'icon-color',
	iconBackgroundColor: 'icon-background-color',
};

export default withColors( iconColorAttributes )( Edit );
