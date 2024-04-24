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
} from '@wordpress/block-editor';
import {
	RangeControl,
	PanelBody,
	ToolbarGroup,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
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
import { TEXT_DOMAIN } from '../../utils/constants';
import { JustifyToolbar } from '../../components/justify-content-control';

const DEFAULT_BLOCK = {
	name: 'crowdify/icon-list-item',
};
const TEMPLATE = [ [ 'crowdify/icon-list-item' ] ];

export default function Edit( { attributes, setAttributes } ) {
	const {
		horizontalSpace,
		verticalSpace,
		iconName,
		iconSize,
		align,
		layout,
	} = attributes;

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

	const inspectorControls = (
		<InspectorControls style="settings">
			<PanelBody title={ __( 'Settings' ) }>
				<ToggleGroupControl
					__nextHasNoMarginBottom
					value={ layout }
					label={ __( 'Layout', TEXT_DOMAIN ) }
					onChange={ ( value ) => setAttributes( { layout: value } ) }
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
			<PanelBody title={ __( 'Icon' ) }>
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
			{ blockControls }
			{ inspectorControls }
			<ul { ...innerBlocksProps } />
		</>
	);
}
