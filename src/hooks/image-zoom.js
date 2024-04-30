/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import {
	InspectorControls,
	withColors,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown, // eslint-disable-line
	__experimentalUseGradient, // eslint-disable-line
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients, // eslint-disable-line
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/**
 * Add the attribute needed for reversing column direction on mobile.
 *
 * @since 0.1.0
 * @param {Object} settings
 */
function addAttributes( settings ) {
	if ( 'core/image' !== settings.name ) {
		return settings;
	}

	// Add the attribute.
	const imageZoomAttributes = {
		margin: {
			type: 'number',
			default: 0,
		},
		scrollOffset: {
			type: 'number',
			default: 0,
		},
		background: {
			type: 'string',
			default: '#fff',
		},
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...imageZoomAttributes,
		},
	};

	return newSettings;
}

addFilter( 'blocks.registerBlockType', 'crowdify/image-zoom', addAttributes );

/**
 * Determines if the active variation is this one
 *
 * @param {*} props
 * @return {boolean} Is this the correct variation?
 */
const isImageZoom = ( props ) => {
	const {
		attributes: { className },
	} = props;
	return className?.includes( 'image-zoom' );
};

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function withControls( BlockEdit ) {
	return compose( [ withColors( { backgroundColor: 'background-color' } ) ] )(
		( props ) => {
			const {
				clientId,
				attributes,
				setAttributes,
				backgroundColor,
				setBackgroundColor,
			} = props;
			const { margin, scrollOffset, background } = attributes;

			if ( ! isImageZoom( props ) && props.name !== 'core/image' ) {
				return <BlockEdit { ...props } />;
			}

			console.log( { props } );

			const { gradientValue, setGradient } = __experimentalUseGradient();

			const colorGradientSettings = useMultipleOriginColorsAndGradients();

			return (
				<>
					<InspectorControls>
						<PanelBody title={ __( 'General' ) }>
							<RangeControl
								label={ __( 'Margin', 'crowdify-blocks' ) }
								help={ __(
									'The space outside the zoomed image',
									'crowdify-blocks'
								) }
								value={ margin }
								onChange={ ( value ) =>
									setAttributes( { margin: value } )
								}
								step={ 1 }
								max={ 1000 }
							/>
							<RangeControl
								label={ __(
									'Scroll Offset',
									'crowdify-blocks'
								) }
								help={ __(
									'The number of pixels to scroll to close the zoom',
									'crowdify-blocks'
								) }
								value={ scrollOffset }
								onChange={ ( value ) =>
									setAttributes( { scrollOffset: value } )
								}
								step={ 1 }
								max={ 1000 }
							/>
						</PanelBody>
					</InspectorControls>
					{ colorGradientSettings.hasColorsOrGradients && (
						<InspectorControls group="color">
							<ColorGradientSettingsDropdown
								__experimentalIsRenderedInSidebar
								settings={ [
									{
										colorValue:
											backgroundColor.color || background,
										gradientValue,
										label: __( 'Background Zoom' ),
										onColorChange: ( colorValue ) => {
											setBackgroundColor( colorValue );
											setAttributes( {
												background: colorValue,
											} );
										},
										onGradientChange: setGradient,
										isShownByDefault: true,
										resetAllFilter: () => {
											setBackgroundColor( undefined );
											setAttributes( {
												background: undefined,
											} );
										},
									},
								] }
								panelId={ clientId }
								{ ...colorGradientSettings }
							/>
						</InspectorControls>
					) }
					<BlockEdit { ...props } />
				</>
			);
		}
	);
}

addFilter( 'editor.BlockEdit', 'crowdify/image-zoom', withControls );
