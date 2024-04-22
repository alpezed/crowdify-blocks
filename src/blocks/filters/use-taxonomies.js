/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';

export const useTaxonomies = ( postType ) => {
	const taxonomies = useSelect(
		( select ) => {
			const { getTaxonomies } = select( coreStore );
			console.log( { getTaxonomies } );
			return getTaxonomies( {
				type: postType,
				per_page: -1,
			} );
		},
		[ postType ]
	);
	return useMemo( () => {
		return taxonomies?.filter(
			( { visibility } ) => !! visibility?.publicly_queryable
		);
	}, [ taxonomies ] );
};
