/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { RangeControl, PanelBody } from '@wordpress/components';

/**
 * Import styles
 *
 */
import './editor.scss';

/**
 * Internal dependencies
 *
 */
import { TEXT_DOMAIN } from '../../utils/constants';

const DEFAULT_BLOCK = {
	name: 'crowdify/icon-list-item',
};
const TEMPLATE = [ [ 'crowdify/icon-list-item' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const { horizontalSpace, verticalSpace, iconName, iconSize } = attributes;

	const blockProps = useBlockProps( {
		style: {
			gap: `${ verticalSpace }px`,
		},
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		defaultBlock: DEFAULT_BLOCK,
		directInsert: true,
		template: TEMPLATE,
		templateLock: false,
		templateInsertUpdatesSelection: true,
		__experimentalCaptureToolbars: true,
	} );

	const inspectorControls = (
		<InspectorControls style="settings">
			<PanelBody title={ __( 'Settings' ) }>
				<RangeControl
					label={ __( 'Vertical Spacing', TEXT_DOMAIN ) }
					value={ verticalSpace }
					initialPosition={ 50 }
					max={ 100 }
					min={ 0 }
					onChange={ ( value ) =>
						setAttributes( { verticalSpace: value } )
					}
				/>
				<RangeControl
					label={ __( 'Horizontal Spacing', TEXT_DOMAIN ) }
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
				<RangeControl
					label={ __( 'Icon Size', TEXT_DOMAIN ) }
					value={ iconSize }
					initialPosition={ 50 }
					max={ 300 }
					min={ 0 }
					onChange={ ( value ) =>
						setAttributes( { iconSize: value } )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);

	return (
		<>
			{ inspectorControls }
			<ul { ...innerBlocksProps } />
		</>
	);
}
