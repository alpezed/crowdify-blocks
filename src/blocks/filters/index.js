/**
 * Wordpress Dependencies
 *
 */
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { postCategories as icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { useRefEffect } from '@wordpress/compose';
import { createHigherOrderComponent } from '@wordpress/compose';

import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import { TEXT_DOMAIN } from '../../utils/text-domain';
import { SwiperInit } from '../slider/swiper-init';
import { PostTemplateCustomToolbar } from '../../components/post-template-custom-toolbar';

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
	save: Save,
} );

const CROWDIFY_POSTS = 'crowdify/posts';

registerBlockVariation( 'core/query', {
	name: CROWDIFY_POSTS,
	title: __( 'Posts', TEXT_DOMAIN ),
	attributes: {
		namespace: CROWDIFY_POSTS,
		showFilter: {
			type: 'number',
			default: true,
		},
	},
	isActive: [ 'namespace' ],
	scope: [ 'inserter', 'transform' ],
} );

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

		// const clonedUl = templateEl.cloneNode( true );

		// if ( ! clonedUl ) {
		// 	return;
		// }

		const list = templateEl?.querySelectorAll( 'li' );
		list?.forEach( ( li ) => li.classList?.add( 'swiper-slide' ) );

		// templateEl.replaceWith( templateEl );

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

		slider.destroy();
		window.requestAnimationFrame( () => {
			// Initialize slider.
			slider = SwiperInit( element, options );
		} );

		return () => {
			slider?.destroy();
		};
	} );

	return (
		<div ref={ sliderRef } className="swiper">
			<BlockListBlock { ...props } className="swiper-wrapper" />
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
		const { name, isSelected, attributes, setAttributes } = props;

		const { layout = {}, crowdify } = attributes;

		const { layout: crowdifyLayout = { type: 'default' } } = crowdify || {};

		if ( name !== 'core/post-template' ) {
			return <BlockEdit { ...props } />;
		}

		const layoutType =
			crowdifyLayout?.type && crowdifyLayout?.type !== 'default'
				? crowdifyLayout?.type
				: layout?.type
				? layout?.type
				: 'default';

		const displayLayout = { ...layout, type: layoutType };

		const setDisplayLayout = ( newDisplayLayout ) => {
			let updated = {
				crowdify: { ...crowdify, layout: { ...newDisplayLayout } },
			};

			// A little hack to render carousel preview.
			// selectBlock( coreQueryId );
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
