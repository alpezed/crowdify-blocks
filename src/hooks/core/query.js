/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * Wordpress Dependencies
 *
 */
import { addFilter } from '@wordpress/hooks';
import { useRefEffect } from '@wordpress/compose';
import { select, subscribe, useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { PostTemplateCustomToolbar } from '~/components/post-template-custom-toolbar';
import { SwiperInit } from '~/blocks/slider/swiper-init';

/**
 * Higher-order component that wraps the given BlockListBlock component with a Swiper slider.
 *
 * @since 0.1.0
 * @param {Function} BlockListBlock - The component to be wrapped.
 */
const withSwiperSlider = ( BlockListBlock ) => ( props ) => {
	const { name, attributes, clientId } = props;

	const { crowdify } = attributes;
	const { layout } = crowdify || {};

	if ( name !== 'core/post-template' || layout?.type !== 'carousel' ) {
		return <BlockListBlock { ...props } />;
	}

	const sliderRef = useRefEffect( ( element ) => {
		if ( ! element ) {
			return;
		}

		const templateEl = element.querySelector( 'ul' );

		if ( ! templateEl ) {
			return;
		}

		const list = templateEl?.querySelectorAll( 'li' );
		list?.forEach( ( li ) => li.classList?.add( 'swiper-slide' ) );

		const options = {
			// ...attributes,
			...{
				autoplay: true,
				grabCursor: false,
				simulateTouch: false,
				slidesPerView: 3,
				spaceBetween: 20,
				navigation: true,
			},
		};

		// Initialize slider.
		let slider = SwiperInit( element, options );

		const unsubscribeSliderUpdateListener = subscribe( () => {
			const selectedBlock = select( blockEditorStore ).getSelectedBlock();

			if ( selectedBlock?.clientId === clientId ) {
				slider?.destroy();

				// Disable the auto play.
				options.autoplay = false;

				// Initialize slider.
				slider = SwiperInit( element, options );

				slider.slideTo( 0, 0 );
			}
		} );

		return () => {
			unsubscribeSliderUpdateListener();
			slider?.destroy();
		};
	} );

	return (
		<div ref={ sliderRef } className="swiper">
			<BlockListBlock
				{ ...props }
				className={ classnames( 'swiper-wrapper', {
					'is-carousel': layout?.type === 'carousel',
				} ) }
			/>
		</div>
	);
};

addFilter( 'editor.BlockListBlock', 'crowdify/add-slider', withSwiperSlider );

/**
 * Higher-order component that wraps the given BlockEdit component with InspectorControls
 * if the active variation is crowdify/posts. Otherwise, it simply returns the BlockEdit component.
 *
 * @param {Function} BlockEdit - The component to be wrapped.
 * @return {Function} The wrapped component.
 */
export const withPostTemplateControls = ( BlockEdit ) => ( props ) => {
	const { name, isSelected, attributes, setAttributes, clientId } = props;

	const { layout = {}, crowdify } = attributes;

	const { layout: crowdifyLayout = { type: 'default' } } = crowdify || {};

	if ( name !== 'core/post-template' ) {
		return <BlockEdit { ...props } />;
	}

	const { selectBlock } = useDispatch( blockEditorStore );
	// eslint-disable-next-line no-shadow
	const { rootClientId } = useSelect( ( select ) => {
		const { getBlockHierarchyRootClientId } = select( blockEditorStore );

		return {
			rootClientId: getBlockHierarchyRootClientId( clientId ),
		};
	}, [] );

	const layoutType = crowdifyLayout?.type ?? layout?.type ?? 'default';

	const displayLayout = { ...layout, type: layoutType };

	const setDisplayLayout = ( newDisplayLayout ) => {
		let updated = {
			crowdify: { ...crowdify, layout: { ...newDisplayLayout } },
		};

		// A little hack to render carousel preview.
		selectBlock( rootClientId );
		// selectBlock( props.clientId );

		if ( newDisplayLayout?.type === 'grid' ) {
			updated = {
				...updated,
				layout: { ...layout, type: newDisplayLayout.type },
			};
		} else {
			updated = {
				...updated,
				layout: { ...layout, type: 'default' },
			};
		}
		setAttributes( updated );
	};

	return (
		<>
			{ isSelected && (
				<PostTemplateCustomToolbar
					displayLayout={ displayLayout }
					setDisplayLayout={ setDisplayLayout }
				/>
			) }
			<BlockEdit key="edit" { ...props } />
		</>
	);
};

addFilter( 'editor.BlockEdit', 'core/post-template', withPostTemplateControls );

function addLayoutAttributes( settings, name ) {
	if ( name !== 'core/post-template' ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			crowdify: {
				type: 'object',
				layout: {
					type: 'default',
				},
			},
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'crowdify/layout-attributes',
	addLayoutAttributes
);
