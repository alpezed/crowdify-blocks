import { isEmpty } from 'lodash';
import classnames from 'classnames';

import {
	Button,
	Modal,
	MenuGroup,
	MenuItem,
	SearchControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import getIcons from '../icons';
import { flattenIconsArray, simplifyCategories } from '../../../utils/icons';

export default function IconsModal( {
	isInserterOpen,
	setInserterOpen,
	icon: iconName,
	onSelect,
} ) {
	const [ searchInput, setSearchInput ] = useState();
	const [ selectedCategory, setSelectedCategory ] =
		useState( 'all__untitled-ui' );

	if ( ! isInserterOpen ) {
		return null;
	}

	const iconsByType = getIcons();

	const iconsAll = flattenIconsArray( iconsByType );
	let shownIcons = [];

	if ( searchInput ) {
		shownIcons = iconsAll.filter( ( icon ) => {
			const input = searchInput.toLowerCase();
			const iconTitle = icon.title.toLowerCase();

			if ( iconTitle.includes( input ) ) {
				return true;
			}

			return false;
		} );
	}

	if ( ! searchInput ) {
		// If an "all" category, fetch all icons of the correct type.
		if ( selectedCategory.startsWith( 'all__' ) ) {
			const categoryType = selectedCategory.replace( 'all__', '' );
			const allIconsOfType =
				iconsByType.filter( ( type ) => {
					return type.type === categoryType;
				} )[ 0 ]?.icons ?? [];
			shownIcons = allIconsOfType;
		} else {
			shownIcons = iconsAll.filter( ( icon ) => {
				const categories = icon?.categories ?? [];
				return categories.includes( selectedCategory );
			} );
		}
	}

	const preparedTypes = [];

	iconsByType.forEach( ( type ) => {
		const title = type?.title ?? type.type;
		const categoriesFull = type?.categories ?? [];
		const categories = simplifyCategories( categoriesFull );
		const allCategory = 'all__' + type.type;
		const iconsOfType = type?.icons ?? [];

		// Sort alphabetically and then add the "all" category.
		if ( ! categories.includes( allCategory ) ) {
			categories.sort().unshift( allCategory );
			categoriesFull.unshift( {
				name: allCategory,
				title: __( 'All', 'crowdify-blocks' ),
			} );
		}

		preparedTypes.push( {
			type: type.type,
			title,
			categoriesFull,
			categories,
			count: iconsOfType.length,
		} );
	} );

	function updateIconAttributes( name ) {
		// const iconsAll = flattenIconsArray( iconsByType );

		onSelect( name );
		// setAttributes( {
		// 	icon: '',
		// 	iconName: name,
		// } );
		setInserterOpen( false );
	}

	function onClickCategory( category ) {
		setSelectedCategory( category );
	}

	function renderIconTypeCategories( type ) {
		return (
			<MenuGroup
				className="icon-inserter__sidebar__category-type"
				label={ type.title }
			>
				{ type.categories.map( ( category ) => {
					const isActive = selectedCategory
						? category === selectedCategory
						: category === 'all__' + type.type;

					const categoryIcons = iconsAll.filter( ( icon ) => {
						const iconCats = icon?.categories ?? [];
						return (
							icon.type === type.type &&
							iconCats.includes( category )
						);
					} );

					const categoryTitle =
						type.categoriesFull.filter(
							( c ) => c.name === category
						)[ 0 ]?.title ?? category;

					return (
						<MenuItem
							key={ `category-${ category }` }
							className={ classnames( {
								'is-active': isActive,
							} ) }
							onClick={ () => onClickCategory( category ) }
							isPressed={ isActive }
						>
							{ categoryTitle }
							<span>
								{ category === 'all__' + type.type
									? type.count
									: categoryIcons.length }
							</span>
						</MenuItem>
					);
				} ) }
			</MenuGroup>
		);
	}

	const searchResults = (
		<div className="icons-list">
			{ shownIcons.map( ( icon ) => {
				// const Icon = icon?.icon;

				return (
					<Button
						key={ `icon-${ icon.name }` }
						className={ classnames(
							'icons-list__item',
							'block-editor-block-types-list__item',
							{
								'is-active': icon.name === iconName,
								// 'has-no-icon-fill': icon?.hasNoIconFill,
							}
						) }
						onClick={ () => updateIconAttributes( icon.name ) }
					>
						<span className="icons-list__item-icon">
							{ icon?.icon }
						</span>
						<span className="icons-list__item-title">
							{ icon?.title ?? icon.name }
						</span>
					</Button>
				);
			} ) }
		</div>
	);

	const noResults = (
		<div className="block-editor-inserter__no-results">
			<p>{ __( 'No results found.', 'crowdify-blocks' ) }</p>
		</div>
	);

	return (
		<Modal
			className="wp-block-crowdify-block-icon-inserter__modal"
			title={ __( 'Icon Library', 'crowdify-blocks' ) }
			onRequestClose={ () => setInserterOpen( false ) }
			isFullScreen
		>
			<div
				className={ classnames( 'icon-inserter', {
					'is-searching': searchInput,
				} ) }
			>
				<div className="icon-inserter__sidebar">
					<div className="icon-inserter__sidebar__search">
						<SearchControl
							value={ searchInput }
							onChange={ setSearchInput }
						/>
					</div>
					{ preparedTypes.map( ( type ) =>
						renderIconTypeCategories( type )
					) }
				</div>
				<div className="icon-inserter__content">
					<div className="icon-inserter__content-grid">
						{ isEmpty( shownIcons ) ? noResults : searchResults }
					</div>
				</div>
			</div>
		</Modal>
	);
}
