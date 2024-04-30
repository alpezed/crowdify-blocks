/**
 * External Dependencies
 *
 */
import classnames from 'classnames';
import { lowerCase } from 'lodash';

/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import {
	Tooltip,
	__experimentalBoxControl as BoxControl, // eslint-disable-line
} from '@wordpress/components';
import { useEffect, useRef, useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';

import './editor.scss';

import { DEVICES } from '~/constants/devices';

export function ResponsiveBoxControl( {
	value,
	label = __( 'Spacing' ),
	onChange,
} ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const containerRef = useRef( null );

	const { deviceType } = useSelect( ( select ) => {
		const { getDeviceType } = select( editorStore );

		return {
			deviceType: getDeviceType(),
		};
	}, [] );

	const { setDeviceType } = useDispatch( editorStore );

	// Function to handle click outside
	const handleClickOutside = ( event ) => {
		if (
			containerRef.current &&
			! containerRef.current.contains( event.target )
		) {
			setIsOpen( false );
		}
	};

	// Attach click event listener on component mount
	useEffect( () => {
		document.addEventListener( 'click', handleClickOutside );
		return () => {
			document.removeEventListener( 'click', handleClickOutside );
		};
	}, [] );

	const switchers = (
		<div
			ref={ containerRef }
			className={ classnames( {
				[ `crowdify-device-${ deviceType?.toLowerCase() }` ]:
					deviceType,
			} ) }
		>
			<div
				className={ classnames(
					'crowdify-control-responsive-switchers',
					{
						'crowdify-control-responsive-switchers-open': isOpen,
						[ `crowdify-control-responsive-switchers-${ deviceType?.toLowerCase() }` ]:
							deviceType,
					}
				) }
			>
				<div className="crowdify-control-responsive-switchers__holder">
					{ DEVICES.map( ( device ) => (
						<Tooltip
							key={ `responsive-device-${ device.value }` }
							text={ device.label }
							placement="right"
						>
							<button
								className={ `crowdify-responsive-switcher tooltip-target crowdify-responsive-switcher-${ device.value }` }
								onClick={ () => {
									setDeviceType( device.label );
									setIsOpen( ! isOpen );
								} }
							>
								{ device.icon }

								<span className="crowdify-screen-only">
									{ device.label }
								</span>
							</button>
						</Tooltip>
					) ) }
				</div>
			</div>
		</div>
	);

	const onChangeBoxControl = ( newValues ) => {
		const newPadding = { ...value, [ lowerCase( deviceType ) ]: newValues };
		onChange( newPadding );
	};

	return (
		<div className="crowdify-responsive-control">
			<BoxControl
				label={
					<div className="crowdify-responsive-label">
						<span className="crowdify-responsive-label__title">
							{ label }
						</span>
						{ switchers }
					</div>
				}
				values={ value[ lowerCase( deviceType ) ] }
				onChange={ onChangeBoxControl }
			/>
		</div>
	);
}
