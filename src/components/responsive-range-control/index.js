/**
 * External Dependencies
 *
 */
import { lowerCase } from 'lodash';

/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useSettings } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import {
	BaseControl,
	RangeControl,
	Flex,
	FlexItem,
	__experimentalSpacer as Spacer, // eslint-disable-line
	__experimentalUseCustomUnits as useCustomUnits, // eslint-disable-line
	__experimentalUnitControl as UnitControl, // eslint-disable-line
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue, // eslint-disable-line
} from '@wordpress/components';

const RANGE_CONTROL_CUSTOM_SETTINGS = {
	px: { max: 1000, step: 1 },
	'%': { max: 100, step: 1 },
	vw: { max: 100, step: 1 },
	vh: { max: 100, step: 1 },
	em: { max: 50, step: 0.1 },
	rem: { max: 50, step: 0.1 },
	svw: { max: 100, step: 1 },
	lvw: { max: 100, step: 1 },
	dvw: { max: 100, step: 1 },
	svh: { max: 100, step: 1 },
	lvh: { max: 100, step: 1 },
	dvh: { max: 100, step: 1 },
	vi: { max: 100, step: 1 },
	svi: { max: 100, step: 1 },
	lvi: { max: 100, step: 1 },
	dvi: { max: 100, step: 1 },
	vb: { max: 100, step: 1 },
	svb: { max: 100, step: 1 },
	lvb: { max: 100, step: 1 },
	dvb: { max: 100, step: 1 },
	vmin: { max: 100, step: 1 },
	svmin: { max: 100, step: 1 },
	lvmin: { max: 100, step: 1 },
	dvmin: { max: 100, step: 1 },
	vmax: { max: 100, step: 1 },
	svmax: { max: 100, step: 1 },
	lvmax: { max: 100, step: 1 },
	dvmax: { max: 100, step: 1 },
};

import { Switchers } from '../switchers';

export function ResponsiveRangeControl( {
	value,
	label = __( 'Spacing' ),
	onChange,
	...props
} ) {
	const { deviceType } = useSelect( ( select ) => {
		const { getDeviceType } = select( editorStore );

		return {
			deviceType: getDeviceType(),
		};
	}, [] );

	const customRangeValue = parseFloat( value[ lowerCase( deviceType ) ] );

	const [ availableUnits ] = useSettings( 'spacing.units' );
	const units = useCustomUnits( {
		availableUnits: availableUnits || [
			'%',
			'px',
			'em',
			'rem',
			'vh',
			'vw',
		],
	} );

	const selectedUnit =
		useMemo(
			() => parseQuantityAndUnitFromRawValue( value ),
			[ value ]
		)[ 1 ] ||
		units[ 0 ]?.value ||
		'px';

	const handleSliderChange = ( next ) => {
		const updatedValues = {
			...value,
			[ lowerCase( deviceType ) ]: [ next, selectedUnit ].join( '' ),
		};

		onChange( updatedValues );
	};

	const handleInputChange = ( newValue ) => {
		const newValues = {
			...value,
			[ lowerCase( deviceType ) ]: newValue,
		};

		onChange( newValues );
	};

	const handleUnitChange = ( newUnit ) => {
		// Attempt to smooth over differences between currentUnit and newUnit.
		// This should slightly improve the experience of switching between unit types.
		const [ currentValue, currentUnit ] =
			parseQuantityAndUnitFromRawValue( value );

		if ( [ 'em', 'rem' ].includes( newUnit ) && currentUnit === 'px' ) {
			// Convert pixel value to an approximate of the new unit, assuming a root size of 16px.
			onChange( ( currentValue / 16 ).toFixed( 2 ) + newUnit );
		} else if (
			[ 'em', 'rem' ].includes( currentUnit ) &&
			newUnit === 'px'
		) {
			// Convert to pixel value assuming a root size of 16px.
			onChange( Math.round( currentValue * 16 ) + newUnit );
		} else if (
			[
				'%',
				'vw',
				'svw',
				'lvw',
				'dvw',
				'vh',
				'svh',
				'lvh',
				'dvh',
				'vi',
				'svi',
				'lvi',
				'dvi',
				'vb',
				'svb',
				'lvb',
				'dvb',
				'vmin',
				'svmin',
				'lvmin',
				'dvmin',
				'vmax',
				'svmax',
				'lvmax',
				'dvmax',
			].includes( newUnit ) &&
			currentValue > 100
		) {
			// When converting to `%` or viewport-relative units, cap the new value at 100.
			onChange( 100 + newUnit );
		}
	};

	return (
		<div className="crowdify-responsive-control">
			<fieldset className="block-editor-height-control">
				<div className="crowdify-responsive-label">
					<span className="crowdify-responsive-label__title">
						<BaseControl.VisualLabel as="legend">
							{ label }
						</BaseControl.VisualLabel>
					</span>
					<Switchers />
				</div>
				<Flex>
					<FlexItem isBlock>
						<UnitControl
							value={ value[ lowerCase( deviceType ) ] }
							units={ units }
							onChange={ handleInputChange }
							onUnitChange={ handleUnitChange }
							min={ 0 }
							size={ '__unstable-large' }
							label={ label }
							hideLabelFromVision
						/>
					</FlexItem>
					<FlexItem isBlock>
						<Spacer marginX={ 2 } marginBottom={ 0 }>
							<RangeControl
								value={ customRangeValue }
								min={ 0 }
								max={
									RANGE_CONTROL_CUSTOM_SETTINGS[
										selectedUnit
									]?.max ?? 100
								}
								step={
									RANGE_CONTROL_CUSTOM_SETTINGS[
										selectedUnit
									]?.step ?? 0.1
								}
								withInputField={ false }
								onChange={ handleSliderChange }
								__nextHasNoMarginBottom
								label={ label }
								hideLabelFromVision
								{ ...props }
							/>
						</Spacer>
					</FlexItem>
				</Flex>
			</fieldset>
			{ /* <HeightControl
				label={
					<div className="crowdify-responsive-label">
						<span className="crowdify-responsive-label__title">
							{ label }
						</span>
						<Switchers />
					</div>
				}
				value={ value[ lowerCase( deviceType ) ] }
				onChange={ onChangeRangeControl }
				{ ...props }
			/> */ }
		</div>
	);
}
