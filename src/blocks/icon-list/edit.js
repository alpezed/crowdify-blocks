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
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
	BlockControls,
	withColors,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown, // eslint-disable-line
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients, // eslint-disable-line
	ContrastChecker, // eslint-disable-line
} from '@wordpress/block-editor';
import {
	RangeControl,
	PanelBody,
	ToolbarGroup,
	__experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, // eslint-disable-line
} from '@wordpress/components';
import { list, listItem } from '@wordpress/icons';

/**
 * Import styles
 *
 */
import './editor.scss';

/**
 * Internal dependencies
 *
 */
import {
	IconControl,
	ResponsiveRangeControl,
	JustifyToolbar,
	AlignContentControl,
} from '~/components';
import { generateResponsiveCSS2 } from '~/utils/css';

const DEFAULT_BLOCK = {
	name: 'crowdify/icon-list-item',
};
const TEMPLATE = [ [ 'crowdify/icon-list-item' ] ];

function Edit( props ) {
	const { clientId, attributes, iconColor, setAttributes, setIconColor } =
		props;
	const {
		horizontalSpace,
		verticalSpace,
		icon,
		iconSize,
		iconLineWidth,
		align,
		layout,
		iconBackgroundColorValue,
		iconColorValue,
		iconVerticalPosition,
		iconVerticalAlign,
		iconHorizontalAlign,
	} = attributes;

	const blockProps = useBlockProps( {
		style: {
			'--cf-icon-list-default-h-space': horizontalSpace
				? `${ horizontalSpace }px`
				: undefined,
			gap: verticalSpace && `${ verticalSpace }px`,
		},
		className: classnames( {
			[ `items-align-${ align }` ]: align,
			[ `is-${ layout }-layout` ]: layout,
		} ),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		defaultBlock: DEFAULT_BLOCK,
		directInsert: true,
		template: TEMPLATE,
		templateLock: false,
		templateInsertUpdatesSelection: true,
		__experimentalCaptureToolbars: true,
	} );

	const blockControls = (
		<BlockControls group="default">
			<ToolbarGroup>
				<JustifyToolbar
					allowedControls={ [ 'left', 'center', 'right' ] }
					value={ align }
					onChange={ ( value ) => setAttributes( { align: value } ) }
				/>
			</ToolbarGroup>
			<ToolbarGroup
				controls={ [
					{
						icon: list,
						title: __( 'Default' ),
						onClick: () => setAttributes( { layout: 'default' } ),
						isActive: layout === 'default',
					},
					{
						icon: listItem,
						title: __( 'Inline' ),
						onClick: () => setAttributes( { layout: 'inline' } ),
						isActive: layout === 'inline',
					},
				] }
			/>
		</BlockControls>
	);

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
		// {
		// 	colorLabel: __( 'Icon Background color', 'crowdify-blocks' ),
		// 	colorValue: iconBackgroundColor.color || iconBackgroundColorValue,
		// 	colorGradientValue: gradientValue,
		// 	onChange: ( colorValue ) => {
		// 		setIconBackgroundColor( colorValue );
		// 		setAttributes( {
		// 			iconBackgroundColorValue: colorValue,
		// 		} );
		// 	},
		// 	onGradientChange: setGradient,
		// 	resetAllFilter: () => {
		// 		setIconBackgroundColor( undefined );
		// 		setAttributes( { iconBackgroundColorValue: undefined } );
		// 	},
		// },
	];

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	// In WordPress <=6.2 this will return null, so default to true in those cases.
	const hasColorsOrGradients =
		colorGradientSettings?.hasColorsOrGradients ?? true;

	const inspectorControls = (
		<>
			<InspectorControls __experimentalToggleGroupControlOptionIcon>
				<PanelBody title={ __( 'Settings' ) }>
					<ToggleGroupControl
						__nextHasNoMarginBottom
						value={ layout }
						label={ __( 'Layout', 'crowdify-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { layout: value } )
						}
					>
						<ToggleGroupControlOptionIcon
							icon={ list }
							label={ __( 'Default' ) }
							value="default"
						/>
						<ToggleGroupControlOptionIcon
							icon={ listItem }
							label={ __( 'Inline' ) }
							value="inline"
						/>
					</ToggleGroupControl>
					<RangeControl
						allowReset
						label={ __( 'Vertical Spacing', 'crowdify-blocks' ) }
						value={ verticalSpace }
						initialPosition={ 50 }
						max={ 100 }
						min={ 0 }
						onChange={ ( value ) =>
							setAttributes( { verticalSpace: value } )
						}
					/>
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
						label={ __( 'Size', 'crowdify-blocks' ) }
						value={ iconSize }
						allowReset
						initialPosition={ 50 }
						max={ 300 }
						min={ 0 }
						onChange={ ( value ) =>
							setAttributes( { iconSize: value } )
						}
					/>
					<RangeControl
						label={ __( 'Line Width', 'crowdify-blocks' ) }
						value={ iconLineWidth }
						allowReset
						step={ 0.1 }
						max={ 4 }
						min={ 0.5 }
						onChange={ ( value ) =>
							setAttributes( { iconLineWidth: value } )
						}
					/>
					<AlignContentControl
						value={ iconHorizontalAlign }
						label={ __(
							'Horizontal Alignment',
							'crowdify-blocks'
						) }
						onChange={ ( value ) =>
							setAttributes( { iconHorizontalAlign: value } )
						}
					/>
					<AlignContentControl
						value={ iconVerticalAlign }
						label={ __( 'Vertical Alignment', 'crowdify-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { iconVerticalAlign: value } )
						}
						isVertical
					/>
					<ResponsiveRangeControl
						value={ iconVerticalPosition }
						label={ __( 'Vertical Position', 'crowdify-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { iconVerticalPosition: value } )
						}
						allowReset={ false }
						min={ -15 }
						max={ 15 }
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
								key={ `icon-block-color-${ colorLabel }` }
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
							backgroundColor: iconBackgroundColorValue,
						} }
						isLargeText={ false }
					/>
				</InspectorControls>
			) }
		</>
	);

	const targetIconElement = `[data-block="${ clientId }"] .list-item-icon`;
	const targetListElement = `[data-block="${ clientId }"] .wp-block-crowdify-icon-list-item`;

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
			{ blockControls }
			{ inspectorControls }
			<ul { ...innerBlocksProps } />
		</>
	);
}

const iconColorAttributes = {
	iconColor: 'icon-color',
	iconBackgroundColor: 'icon-background-color',
};

export default withColors( iconColorAttributes )( Edit );
