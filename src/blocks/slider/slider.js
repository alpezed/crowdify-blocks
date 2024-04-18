/**
 * Wordpress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	store as blockEditorStore,
	ButtonBlockAppender,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useRefEffect } from '@wordpress/compose';
import { select, subscribe } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { SwiperInit } from './swiper-init';
import {
	ALLOWED_BLOCKS,
	DEFAULT_BLOCK,
	DEFAULT_TEMPLATE,
	SLIDE_TEMPLATE,
} from './constants';

const Navigation = () => {
	return (
		<>
			<div className="swiper-button-prev">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="60"
					height="61"
					viewBox="0 0 60 61"
					fill="none"
				>
					<path
						d="M30 20.5L20 30.5M20 30.5L30 40.5M20 30.5H40M19.5 53H40.5C44.7004 53 46.8006 53 48.4049 52.1825C49.8161 51.4635 50.9635 50.3161 51.6825 48.9049C52.5 47.3006 52.5 45.2004 52.5 41V20C52.5 15.7996 52.5 13.6994 51.6825 12.0951C50.9635 10.6839 49.8161 9.5365 48.4049 8.81745C46.8006 8 44.7004 8 40.5 8H19.5C15.2996 8 13.1994 8 11.5951 8.81745C10.1839 9.5365 9.0365 10.6839 8.31745 12.0951C7.5 13.6994 7.5 15.7996 7.5 20V41C7.5 45.2004 7.5 47.3006 8.31745 48.9049C9.0365 50.3161 10.1839 51.4635 11.5951 52.1825C13.1994 53 15.2996 53 19.5 53Z"
						stroke="#fff"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<div className="swiper-button-next">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="60"
					height="61"
					viewBox="0 0 60 61"
					fill="none"
				>
					<path
						d="M30 40.5L40 30.5M40 30.5L30 20.5M40 30.5H20M19.5 53H40.5C44.7004 53 46.8006 53 48.4049 52.1825C49.8161 51.4635 50.9635 50.3161 51.6825 48.9049C52.5 47.3006 52.5 45.2004 52.5 41V20C52.5 15.7996 52.5 13.6994 51.6825 12.0951C50.9635 10.6839 49.8161 9.5365 48.4049 8.81745C46.8006 8 44.7004 8 40.5 8H19.5C15.2996 8 13.1994 8 11.5951 8.81745C10.1839 9.5365 9.0365 10.6839 8.31745 12.0951C7.5 13.6994 7.5 15.7996 7.5 20V41C7.5 45.2004 7.5 47.3006 8.31745 48.9049C9.0365 50.3161 10.1839 51.4635 11.5951 52.1825C13.1994 53 15.2996 53 19.5 53Z"
						stroke="#fff"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</>
	);
};

export const Slider = ( { clientId, attributes } ) => {
	const { navigation, pagination } = attributes;

	const selectedBlock = select( blockEditorStore ).getSelectedBlock();

	const sliderRef = useRefEffect( ( element ) => {
		const options = {
			...attributes,
			...{
				autoplay: false,
				grabCursor: false,
				simulateTouch: false,
			},
		};

		// Initialize slider.
		let slider = SwiperInit( element, options );

		// Store the current slide order to detect changes, such as adding, removing, or reordering slides.
		let slideOrder = select( blockEditorStore ).getBlockOrder( clientId );

		// Subscribe slider update events like adding, removing, or reordering slides.
		const unsubscribeSliderUpdateListener = subscribe( () => {
			const currentSlidesOrder =
				select( blockEditorStore ).getBlockOrder( clientId );

			// Check if the slider has been changed.
			if ( currentSlidesOrder.toString() !== slideOrder.toString() ) {
				// const selectedBlock =
				// 	select( blockEditorStore ).getSelectedBlock();
				const slideAdded =
					currentSlidesOrder.length > slideOrder.length;
				const slideRemoved =
					currentSlidesOrder.length < slideOrder.length;
				const slideMoved =
					currentSlidesOrder.length === slideOrder.length;
				const activeIndex = slider.activeIndex;

				// Store the current slide order before destroying the slider instance.
				slideOrder = currentSlidesOrder;
				slider.destroy();

				window.requestAnimationFrame( () => {
					// Initialize slider.
					slider = SwiperInit( element, options );

					// Determine where the slider should go.
					let slideToIndex = activeIndex;
					if ( slideAdded ) {
						slideToIndex = slideOrder.length;
					} else if ( slideRemoved ) {
						slideToIndex = activeIndex - 1;
					} else if ( slideMoved ) {
						slideToIndex = slideOrder.findIndex(
							( clientId ) => clientId === selectedBlock.clientId // eslint-disable-line no-shadow
						);
					}

					if ( slideToIndex < 0 ) {
						slideToIndex = 0;
					}

					slider.slideTo( slideToIndex, 0 );
				} );
			}
		} );

		return () => {
			unsubscribeSliderUpdateListener();
			slider.destroy();
		};
	} );

	// Our nested innerblocks that will be inserted by default.
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'swiper-wrapper' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			defaultBlock: {
				name: DEFAULT_BLOCK,
			},
			directInsert: true,
			orientation: 'horizontal',
			template: DEFAULT_TEMPLATE,
			renderAppender: false,
			templateInsertUpdatesSelection: true,
		}
	);

	return (
		<>
			<div className="swiper" ref={ sliderRef }>
				<div { ...innerBlocksProps } />
				{ navigation && <Navigation /> }
			</div>

			{ selectedBlock?.clientId === clientId && (
				<ButtonBlockAppender
					className="slider-appender has-icon"
					rootClientId={ clientId }
				/>
			) }
		</>
	);
};
