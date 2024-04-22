/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { useRefEffect } from '@wordpress/compose';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { PostTemplateCustomToolbar } from '../components/post-template-custom-toolbar';
import { SwiperInit } from '../blocks/slider/swiper-init';
import classnames from 'classnames';

/**
 * Higher-order component that wraps the given `BlockListBlock` component with a Swiper slider.
 *
 * @param {React.ComponentType} BlockListBlock - The component to wrap with the Swiper slider.
 * @return {React.ComponentType} The wrapped component with the Swiper slider functionality.
 */
const withSwiperSlider = ( BlockListBlock ) => ( props ) => {
	const { name, attributes } = props;

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

		return () => {
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
export const withPostTemplateControls = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { name, isSelected, attributes, setAttributes, clientId } = props;

		const { layout = {}, crowdify } = attributes;

		const { layout: crowdifyLayout = { type: 'default' } } = crowdify || {};

		if ( name !== 'core/post-template' ) {
			return <BlockEdit { ...props } />;
		}

		const { selectBlock } = useDispatch( blockEditorStore );
		const { rootClientId } = useSelect( ( select ) => {
			const { getBlockHierarchyRootClientId } =
				select( blockEditorStore );

			const rootClientId = getBlockHierarchyRootClientId( clientId );

			return {
				rootClientId,
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
	}
);

addFilter( 'editor.BlockEdit', 'core/post-template', withPostTemplateControls );

/**
 * Adds layout attributes to the settings object if the name is 'core/post-template'.
 *
 * @param {Object} settings - The settings object.
 * @param {string} name - The name of the template.
 * @returns {Object} - The updated settings object.
 */
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
