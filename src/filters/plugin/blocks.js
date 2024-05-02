/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getUniqueId } from '~/utils/block-id';

/**
 * Add the default attribute needed for the block.
 *
 * @since 0.1.0
 * @param {Object} settings
 */
function addDefaultAttributes( settings ) {
	if ( ! settings.name.startsWith( 'crowdify/' ) ) {
		return settings;
	}

	// Add the attribute.
	const defaultAttributes = {
		uniqueId: {
			type: 'string',
		},
	};

	const newSettings = {
		...settings,
		attributes: {
			...settings.attributes,
			...defaultAttributes,
		},
	};

	return newSettings;
}

addFilter(
	'blocks.registerBlockType',
	'crowdify/add-default-attributes',
	addDefaultAttributes
);

/**
 * Filter the BlockEdit object and uniqueId property.
 *
 * @since 0.1.0
 * @param {Object} BlockEdit
 */
function withUniqueIdProp( BlockEdit ) {
	return ( props ) => {
		const { attributes, setAttributes, clientId } = props;
		const { uniqueId } = attributes;

		useEffect( () => {
			setAttributes( {
				uniqueId: getUniqueId(
					`${ props.name.replace( /\//g, '-' ) }`,
					clientId
				),
			} );
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [ clientId ] );

		if ( ! props.name.startsWith( 'crowdify/' ) ) {
			return <BlockEdit { ...props } />;
		}

		return <BlockEdit uniqueId={ uniqueId } { ...props } />;
	};
}

addFilter(
	'editor.BlockEdit',
	'crowdify/add-unique-id-prop',
	withUniqueIdProp
);
