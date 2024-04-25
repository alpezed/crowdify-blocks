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
	ContrastChecker, // eslint-disable-line
	withColors,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown, // eslint-disable-line
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients, // eslint-disable-line
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

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
		placeholder,
		content,
		icon,
		iconSize,
		iconColorValue,
		horizontalSpace,
	} = attributes;
	const {
		iconName: fallbackIconName,
		horizontalSpace: parentHorizontalSpace,
		iconSize: fallbackIconSize,
		iconColor: fallbackIconColor,
		iconColorValue: fallbackIconColorValue,
		iconLineWidth: fallbackIconLineWidth,
	} = context;

	const { icon: printedIcon } = useIcon( {
		iconName: icon,
		fallbackIconName,
	} );

	const blockProps = useBlockProps( {
		style: {
			gap: `${ horizontalSpace ?? parentHorizontalSpace }px`,
		},
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: false,
		__unstableDisableDropZone: true,
	} );

	const themeIconColor = iconColor ?? fallbackIconColor;
	const iconClasses = classnames( 'list-item-icon', {
		'has-icon-color': iconColorValue || fallbackIconColorValue,
		[ `has-${ themeIconColor }-color` ]: themeIconColor,
	} );

	console.log( { fallbackIconLineWidth } );

	const iconStyle = {
		fontSize: `${ iconSize ?? fallbackIconSize }px`,
		color: iconColorValue,
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

	return (
		<>
			{ inspectorControls }
			<li { ...innerBlocksProps }>
				{ printedIcon && (
					<span className={ iconClasses } style={ iconStyle }>
						{ printedIcon }
					</span>
				) }
				<RichText
					identifier="content"
					tagName="div"
					onChange={ ( nextContent ) =>
						setAttributes( { content: nextContent } )
					}
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
