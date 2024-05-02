/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { CROWDIFY_IMAGE_ZOOM } from '~/constants/variation';

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
	const imageAttributes = {
		isForceFullWidth: {
			type: 'boolean',
			default: false,
		},
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...imageAttributes,
		},
	};

	return newSettings;
}

addFilter(
	'blocks.registerBlockType',
	'crowdify/enable-force-full-width/add-attributes',
	addAttributes
);

/**
 * Determines if the active variation is this one
 *
 * @param {*} props
 * @return {boolean} Is this the correct variation?
 */
const isImageZoom = ( props ) => {
	const {
		attributes: { namespace },
	} = props;
	return namespace && namespace === CROWDIFY_IMAGE_ZOOM;
};

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function withForceFullWidthControls( BlockEdit ) {
	return ( props ) => {
		const { attributes, setAttributes } = props;
		const { isForceFullWidth } = attributes;

		if ( isImageZoom( props ) || props.name !== 'core/image' ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<div className="crowdify-force-full-width-container">
						<ToggleControl
							label={ __(
								'Force Full Width',
								'crowdify-blocks'
							) }
							checked={ isForceFullWidth }
							onChange={ () => {
								setAttributes( {
									isForceFullWidth: ! isForceFullWidth,
								} );
							} }
						/>
					</div>
				</InspectorControls>
			</>
		);
	};
}

addFilter( 'editor.BlockEdit', 'core/image', withForceFullWidthControls );

/**
 * Add icon and position classes in the Editor.
 *
 * @since 0.1.0
 * @param {Object} BlockListBlock
 */
function addClasses( BlockListBlock ) {
	return ( props ) => {
		const { name, attributes } = props;

		if ( 'core/image' !== name || ! attributes?.isForceFullWidth ) {
			return <BlockListBlock { ...props } />;
		}

		const classes = classnames( props?.className, {
			'is-force-full-width': attributes?.isForceFullWidth,
		} );

		return <BlockListBlock { ...props } className={ classes } />;
	};
}

addFilter(
	'editor.BlockListBlock',
	'crowdify/enable-column-direction/add-classes',
	addClasses
);
