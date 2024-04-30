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
	__experimentalHStack as HStack, // eslint-disable-line
	__experimentalBoxControl as BoxControl, // eslint-disable-line
} from '@wordpress/components';
import { useState } from '@wordpress/element';
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
	const { deviceType } = useSelect( ( select ) => {
		const { getDeviceType } = select( editorStore );

		return {
			deviceType: getDeviceType(),
		};
	}, [] );

	const { setDeviceType } = useDispatch( editorStore );

	const switchers = (
		<div
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
						<button
							key={ `responsive-device-${ device.value }` }
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
