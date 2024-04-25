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
import { IconControl, JustifyToolbar } from '~/components';

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
		iconName,
		iconSize,
		iconLineWidth,
		align,
		layout,
		iconBackgroundColorValue,
		iconColorValue,
	} = attributes;

	// const { gradientValue, setGradient } = useGradient();

	const blockProps = useBlockProps( {
		style: {
			gap: `${ verticalSpace }px`,
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
						value={ iconName }
						label={ __( 'Icon', 'crowdify-blocks' ) }
						onChange={ ( value ) =>
							setAttributes( { iconName: value } )
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

	return (
		<>
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
