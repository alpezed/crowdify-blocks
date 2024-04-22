/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	__experimentalUnitControl as UnitControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { TEXT_DOMAIN } from '../../utils/constants';

export const Inspector = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		autoplay,
		loop,
		delay,
		navigation,
		pagination,
		effect,
		speed,
		direction,
		autoheight,
		clickablePagination,
		paginationType,
		spaceBetween,
		slidesPerView,
		freeMode,
		sticky,
	} = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Settings', TEXT_DOMAIN ) }>
				<ToggleControl
					label={ __( 'Navigation', TEXT_DOMAIN ) }
					checked={ navigation }
					onChange={ ( value ) =>
						setAttributes( { navigation: value } )
					}
					help={ __(
						'“Navigation” will display arrows so user can navigate forward/backward.',
						TEXT_DOMAIN
					) }
				/>
				<ToggleControl
					label={ __( 'Auto Height', TEXT_DOMAIN ) }
					checked={ autoheight }
					onChange={ ( value ) =>
						setAttributes( { autoheight: value } )
					}
					help={ __(
						'Set to true and slider wrapper will adapt its height to the height of the currently active slide',
						TEXT_DOMAIN
					) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Direction Settings', TEXT_DOMAIN ) }>
				<SelectControl
					label={ __( 'Direction', TEXT_DOMAIN ) }
					value={ direction }
					options={ [
						{ label: 'Horizontal', value: 'horizontal' },
						{ label: 'Vertical', value: 'vertical' },
					] }
					onChange={ ( value ) =>
						setAttributes( { direction: value } )
					}
					help={ __(
						'For vertical slider, Slides Per View should be set to 1',
						TEXT_DOMAIN
					) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Pagination Settings', TEXT_DOMAIN ) }>
				<ToggleControl
					label={ __( 'Pagination', TEXT_DOMAIN ) }
					checked={ pagination }
					onChange={ ( value ) =>
						setAttributes( { pagination: value } )
					}
					help={ __(
						'“Pagination” will display dots along the bottom for user to click through slides.',
						TEXT_DOMAIN
					) }
				/>
				<SelectControl
					label={ __( 'Pagination Type', TEXT_DOMAIN ) }
					value={ paginationType }
					options={ [
						{ label: 'Progress Bar', value: 'progressbar' },
						{ label: 'Bullets', value: 'bullets' },
						{ label: 'Fraction', value: 'fraction' },
					] }
					onChange={ ( value ) =>
						setAttributes( { paginationType: value } )
					}
					help={ __( 'Select type of pagination.', TEXT_DOMAIN ) }
				/>
				<ToggleControl
					label={ __( 'Clickable Pagination', TEXT_DOMAIN ) }
					checked={ clickablePagination }
					onChange={ ( value ) =>
						setAttributes( { clickablePagination: value } )
					}
					help={ __(
						'If enabled then clicking on pagination button will cause transition to appropriate slide. Only for bullets pagination type',
						TEXT_DOMAIN
					) }
				/>
				<SelectControl
					label={ __( 'Direction', TEXT_DOMAIN ) }
					value={ direction }
					options={ [
						{ label: 'Horizontal', value: 'horizontal' },
						{ label: 'Vertical', value: 'vertical' },
					] }
					onChange={ ( value ) =>
						setAttributes( { direction: value } )
					}
					help={ __(
						'For vertical slider, Slides Per View should be set to 1',
						TEXT_DOMAIN
					) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Slider Settings', TEXT_DOMAIN ) }>
				<NumberControl
					label={ __( 'Space Between', TEXT_DOMAIN ) }
					value={ spaceBetween }
					onChange={ ( value ) =>
						setAttributes( { spaceBetween: value } )
					}
					help={ __( 'Distance between slides in px.', TEXT_DOMAIN ) }
				/>
				<NumberControl
					label="Slider Per View"
					value={ slidesPerView }
					onChange={ ( value ) =>
						setAttributes( { slidesPerView: value } )
					}
					help={ __(
						"Number of slides per view (slides visible at the same time on slider's container). Can be a number or auto",
						TEXT_DOMAIN
					) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Animation', TEXT_DOMAIN ) }>
				<ToggleControl
					label={ __( 'Autoplay', TEXT_DOMAIN ) }
					checked={ autoplay }
					onChange={ ( value ) =>
						setAttributes( { autoplay: value } )
					}
					help={ __(
						'“Autoplay” will automatically advance the slides. Note: this is intentionally disabled in the editor, but will affect the front end.',
						TEXT_DOMAIN
					) }
				/>
				<ToggleControl
					label={ __( 'Loop', TEXT_DOMAIN ) }
					checked={ loop }
					onChange={ ( value ) => setAttributes( { loop: value } ) }
					help={ __(
						'Set to true to enable continuous loop mode',
						TEXT_DOMAIN
					) }
				/>
				<NumberControl
					label="Delay"
					value={ delay }
					onChange={ ( value ) => setAttributes( { delay: value } ) }
					help={ __(
						'Delay between transitions (in ms). If this parameter is not specified, auto play will be disabled',
						TEXT_DOMAIN
					) }
				/>
				<SelectControl
					label={ __( 'Effect', TEXT_DOMAIN ) }
					value={ effect }
					options={ [
						{ label: 'Slide', value: 'slide' },
						{ label: 'Fade', value: 'fade' },
						{ label: 'Cube', value: 'cube' },
						{ label: 'Cover Flow', value: 'coverflow' },
						{ label: 'Flip', value: 'flip' },
						{ label: 'Creative', value: 'creative' },
						{ label: 'Cards', value: 'cards' },
					] }
					onChange={ ( value ) => setAttributes( { effect: value } ) }
					help={ __(
						'Select the main animation effect for transitioning between slides',
						TEXT_DOMAIN
					) }
				/>
				<RangeControl
					label="Transition Speed"
					value={ speed }
					min={ 0 }
					max={ 2000 }
					help={ __(
						'Duration of transition between slides (in ms)',
						TEXT_DOMAIN
					) }
					initialPosition={ 50 }
					onChange={ ( value ) => setAttributes( { speed: value } ) }
				/>
				<ToggleControl
					label={ __( 'Free Mode', TEXT_DOMAIN ) }
					checked={ freeMode }
					onChange={ ( value ) =>
						setAttributes( { freeMode: value } )
					}
					help={ __(
						'Enables free mode functionality.',
						TEXT_DOMAIN
					) }
				/>
				<ToggleControl
					label={ __( 'Sticky', TEXT_DOMAIN ) }
					checked={ sticky }
					disabled={ ! freeMode }
					onChange={ ( value ) => setAttributes( { sticky: value } ) }
					help={ __(
						'Set to enabled to enable snap to slides positions in free mode',
						TEXT_DOMAIN
					) }
				/>
			</PanelBody>
		</InspectorControls>
	);
};
