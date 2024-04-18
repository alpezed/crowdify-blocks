/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

import { Slider } from './slider';
import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';

export default function Edit( props ) {
	const { clientId, attributes, setAttributes } = props;
	const { autoplay, navigation, pagination } = attributes;

	const blockProps = useBlockProps();

	const inspectorControls = (
		<InspectorControls>
			<PanelBody title={ __( 'Settings', 'wpe' ) }>
				<PanelRow>
					<ToggleControl
						label={ __( 'Autoplay', 'wpe' ) }
						checked={ autoplay }
						onChange={ ( value ) =>
							setAttributes( { autoplay: value } )
						}
						help={ __(
							'“Autoplay” will automatically advance the slides. Note: this is intentionally disabled in the editor, but will affect the front end.'
						) }
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={ __( 'Navigation', 'wpe' ) }
						checked={ navigation }
						onChange={ ( value ) =>
							setAttributes( { navigation: value } )
						}
						help={ __(
							'“Navigation” will display arrows so user can navigate forward/backward.'
						) }
					/>
				</PanelRow>
				<PanelRow>
					<ToggleControl
						label={ __( 'Pagination', 'wpe' ) }
						checked={ pagination }
						onChange={ ( value ) =>
							setAttributes( { pagination: value } )
						}
						help={ __(
							'“Pagination” will display dots along the bottom for user to click through slides.'
						) }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
	);

	return (
		<>
			{ inspectorControls }
			<div { ...blockProps }>
				<Slider clientId={ clientId } attributes={ attributes } />
			</div>
		</>
	);
}
