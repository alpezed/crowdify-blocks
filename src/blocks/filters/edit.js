/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import {
	store as blockEditorStore,
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	useBlockProps,
	__experimentalGetGapCSSValue as getGapCSSValue,
} from '@wordpress/block-editor';
import { store as coreStore, useEntityRecords } from '@wordpress/core-data';
import { Spinner, TextControl } from '@wordpress/components';
import { select, useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { TEXT_DOMAIN } from '../../utils/constants';
import { useTaxonomies } from './use-taxonomies';

/**
 *  Styles
 */
import './editor.scss';

export default function Edit( props ) {
	const {
		clientId,
		attributes,
		setAttributes,
		context: { query: { postType } = {} },
	} = props;

	const { term, separator, textAlign, style } = attributes;

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	// Get the parent block's clientId which is the crowdify/posts that we created as variant of core/query.
	const { rootClientId, parentBlockClientId, parentAttributes } = useSelect(
		( select ) => {
			const {
				getBlockRootClientId,
				getBlockHierarchyRootClientId,
				getBlockAttributes,
			} = select( blockEditorStore );

			// Get clientID of the parent block.
			const rootClientId = getBlockHierarchyRootClientId( clientId );
			// Get parent attributes using child block ID
			// @see https://github.com/WordPress/gutenberg/issues/9032
			const parentAttributes = getBlockAttributes( rootClientId );

			return {
				rootClientId,
				parentBlockClientId: getBlockRootClientId( clientId ),
				parentAttributes,
			};
		},
		[ clientId ]
	);

	// Update the parent block attribute
	const onUpdateParentAttributes = ( e, category ) => {
		e.preventDefault();

		if ( ! parentBlockClientId ) {
			return;
		}

		if ( category === 'all' ) {
			updateBlockAttributes( rootClientId, {
				...parentAttributes,
				query: {
					...parentAttributes.query,
					taxQuery: {
						...parentAttributes.query?.taxQuery,
						category: [],
					},
				},
			} );
			return;
		}

		updateBlockAttributes( rootClientId, {
			...parentAttributes,
			query: {
				...parentAttributes.query,
				taxQuery: {
					...parentAttributes.query?.taxQuery,
					category: [ category ],
				},
			},
		} );
	};

	// const taxonomies = useTaxonomies( postType );

	// if ( ! taxonomies || taxonomies.length === 0 ) {
	// 	return null;
	// }

	const { records: categories, isResolving } = useEntityRecords(
		'taxonomy',
		'category'
	);

	if ( isResolving ) {
		return <Spinner />;
	}

	const blockGap = getGapCSSValue( style?.spacing?.blockGap );

	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
			[ `taxonomy-${ term }` ]: term,
		} ),
	} );

	const styles = {
		...blockProps?.style,
		gap: blockGap,
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<InspectorControls group="advanced">
				<TextControl
					__nextHasNoMarginBottom
					autoComplete="off"
					label={ __( 'Separator' ) }
					value={ separator || '' }
					onChange={ ( nextValue ) => {
						setAttributes( { separator: nextValue } );
					} }
					help={ __( 'Enter character(s) used to separate terms.' ) }
				/>
			</InspectorControls>
			<ul { ...blockProps } style={ styles }>
				<li>
					<a
						href="#"
						className={ classnames( {
							'is-selected':
								! parentAttributes.query?.taxQuery?.category ||
								parentAttributes.query?.taxQuery?.category
									?.length === 0,
						} ) }
						onClick={ ( e ) =>
							onUpdateParentAttributes( e, 'all' )
						}
					>
						{ __( 'View All', 'crowdify-blocks' ) }
					</a>
				</li>
				{ categories?.map( ( category ) => (
					<li key={ category.id }>
						<a
							href={ category.link }
							className={ classnames( {
								'is-selected':
									parentAttributes.query?.taxQuery?.category?.includes(
										category.id
									),
							} ) }
							onClick={ ( e ) =>
								onUpdateParentAttributes( e, category.id )
							}
						>
							{ category.name }
						</a>
					</li>
				) ) }
			</ul>
		</>
	);
}
