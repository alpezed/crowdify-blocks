/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import {
	__experimentalToolsPanel as ToolsPanel, // eslint-disable-line
	__experimentalToolsPanelItem as ToolsPanelItem, // eslint-disable-line
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { CROWDIFY_SEPARATOR } from '~/constants/variation';
import { ResponsiveRangeControl } from '~/components';
import { generateResponsiveCSS2 } from '~/utils/css';
import { useEffect } from '@wordpress/element';
import { getUniqueId } from '~/utils/block-id';

/**
 * Add the attribute needed for reversing column direction on mobile.
 *
 * @since 0.1.0
 * @param {Object} settings
 */
function addAttributes( settings ) {
	if ( 'core/separator' !== settings.name ) {
		return settings;
	}

	// Add the attribute.
	const spacerAttributes = {
		namespace: {
			type: 'string',
		},
		uniqueId: {
			type: 'string',
		},
		width: {
			type: 'object',
			default: {
				desktop: '100%',
			},
			desktop: '',
			tablet: '',
			mobile: '',
		},
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...spacerAttributes,
		},
	};

	return newSettings;
}

addFilter(
	'blocks.registerBlockType',
	'crowdify/separator/attributes',
	addAttributes
);

/**
 * Determines if the active variation is this one
 *
 * @param {*} props
 * @return {boolean} Is this the correct variation?
 */
const isCrowdifySeparator = ( props ) => {
	const {
		attributes: { namespace },
	} = props;
	return namespace && namespace === CROWDIFY_SEPARATOR;
};

/**
 * Filter the BlockEdit object and add icon inspector controls to button blocks.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function withControls( BlockEdit ) {
	return ( props ) => {
		const { attributes, setAttributes, clientId, name } = props;
		const { width } = attributes;

		useEffect( () => {
			setAttributes( {
				uniqueId: getUniqueId(
					`${ name.replace( /\//g, '-' ) }`,
					clientId
				),
			} );
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [ clientId ] );

		if ( ! isCrowdifySeparator( props ) ) {
			return <BlockEdit { ...props } />;
		}

		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<ToolsPanel label={ __( 'Settings' ) }>
						<ToolsPanelItem
							hasValue={ () => !! width }
							label={ __( 'Counter Number' ) }
							isShownByDefault
							onDeselect={ () =>
								setAttributes( { width: undefined } )
							}
						>
							<ResponsiveRangeControl
								value={ width }
								label={ __( 'Width', 'crowdify-blocks' ) }
								onChange={ ( value ) =>
									setAttributes( { width: value } )
								}
								allowReset={ false }
							/>
						</ToolsPanelItem>
					</ToolsPanel>
				</InspectorControls>
			</>
		);
	};
}

addFilter( 'editor.BlockEdit', 'crowdify/separator/controls', withControls );

/**
 * Add separator classes in the Editor.
 *
 * @since 0.1.0
 * @param {Object} BlockListBlock
 */
function addClasses( BlockListBlock ) {
	return ( props ) => {
		const { attributes } = props;

		if ( CROWDIFY_SEPARATOR !== attributes?.namespace ) {
			return <BlockListBlock { ...props } />;
		}

		const blockId = attributes?.uniqueId?.replace( /core/g, 'crowdify' );

		return (
			<>
				<style>
					{ generateResponsiveCSS2( `#${ blockId }`, {
						width: attributes?.width,
					} ) }
				</style>
				<div id={ blockId }>
					<BlockListBlock { ...props } />
				</div>
			</>
		);
	};
}

addFilter(
	'editor.BlockListBlock',
	'crowdify/separator/add-classes',
	addClasses
);

function wrapSeparatorBlockInContainer( element, blockType, attributes ) {
	// skip if element is undefined
	if ( ! element ) {
		return;
	}

	// only apply to crowdify separator block variation
	if ( ! isCrowdifySeparator( blockType ) ) {
		return element;
	}

	const blockId = attributes?.uniqueId?.replace( /core/g, 'crowdify' );

	// return the element wrapped in a div
	return (
		<>
			<style>
				{ generateResponsiveCSS2( `#${ blockId }`, {
					width: attributes?.width,
				} ) }
			</style>
			<div id={ blockId }>{ element }</div>
		</>
	);
}

addFilter(
	'blocks.getSaveElement',
	'crowdify/wrap-spacer-block-in-container',
	wrapSeparatorBlockInContainer
);
