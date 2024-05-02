/**
 * External dependencies
 */
import { lowerCase } from 'lodash';

/**
 * WordPress dependencies
 */
import {
	ToolbarGroup,
	__experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, // eslint-disable-line
} from '@wordpress/components';
import { justifyLeft, justifyCenter, justifyRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { Switchers } from '../switchers';
import { alignTop, alignCenter, alignBottom } from './icons';

function AlignContentUI( props ) {
	const {
		allowedControls = props.isVertical
			? [ 'start', 'center', 'end' ]
			: [ 'left', 'center', 'right' ],
		isCollapsed = true,
		onChange,
		value,
		popoverProps,
		isToolbar,
		isVertical,
	} = props;

	const { deviceType } = useSelect( ( select ) => {
		const { getDeviceType } = select( editorStore );

		return {
			deviceType: getDeviceType(),
		};
	}, [] );

	const icons = {
		[ isVertical ? 'start' : 'left' ]: isVertical ? alignTop : justifyLeft,
		center: isVertical ? alignCenter : justifyCenter,
		[ isVertical ? 'end' : 'right' ]: isVertical
			? alignBottom
			: justifyRight,
	};

	const currentValue = value[ lowerCase( deviceType ) ];

	// If the control is already selected we want a click
	// again on the control to deselect the item, so we
	// call onChange( undefined )
	const handleClick = ( next ) => {
		const newValue = { [ lowerCase( deviceType ) ]: next };

		if ( next === value[ lowerCase( deviceType ) ] ) {
			onChange( undefined );
		} else {
			onChange( newValue );
		}
	};

	const icon = currentValue ? icons[ currentValue ] : icons.left;
	const allControls = [
		{
			name: isVertical ? 'start' : 'left',
			icon: isVertical ? alignTop : justifyLeft,
			title: isVertical ? __( 'Start' ) : __( 'Left' ),
			isActive: isVertical ? 'start' === value : 'left' === value,
			onClick: () => handleClick( isVertical ? 'start' : 'left' ),
		},
		{
			name: 'center',
			icon: isVertical ? alignCenter : justifyCenter,
			title: __( 'Center' ),
			isActive: 'center' === value,
			onClick: () => handleClick( 'center' ),
		},
		{
			name: isVertical ? 'end' : 'right',
			icon: isVertical ? alignBottom : justifyRight,
			title: isVertical ? __( 'End' ) : __( 'Right' ),
			isActive: isVertical ? 'end' === value : 'right' === value,
			onClick: () => handleClick( isVertical ? 'end' : 'right' ),
		},
	];

	const extraProps = isToolbar ? { isCollapsed } : {};

	if ( ! isToolbar ) {
		return (
			<div className="crowdify-responsive-control">
				<ToggleGroupControl
					value={ currentValue }
					label={
						<div className="crowdify-responsive-label">
							<span className="crowdify-responsive-label__title">
								{ isVertical
									? __( 'Vertical alignment' )
									: __( 'Horizontal alignment' ) }
							</span>
							<Switchers />
						</div>
					}
					onChange={ ( newValue ) => handleClick( newValue ) }
				>
					{ allControls.map( ( control ) => (
						<ToggleGroupControlOptionIcon
							key={ `vertical-align-${ control.name }` }
							icon={ control.icon }
							label={ control.title }
							value={ control.name }
						/>
					) ) }
				</ToggleGroupControl>
			</div>
		);
	}

	return (
		<ToolbarGroup
			icon={ icon }
			popoverProps={ popoverProps }
			label={
				isVertical
					? __( 'Vertical alignment' )
					: __( 'Horizontal alignment' )
			}
			controls={ allControls.filter( ( elem ) =>
				allowedControls.includes( elem.name )
			) }
			{ ...extraProps }
		/>
	);
}

export default AlignContentUI;
