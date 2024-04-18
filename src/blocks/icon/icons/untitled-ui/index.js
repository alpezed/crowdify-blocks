import { startCase } from 'lodash';

async function importIcons( directories ) {
	try {
		const allIcons = await Promise.all(
			directories.map( async ( directory ) => {
				const iconsModule = await import( `./${ directory }` );

				const icons = Object.entries( iconsModule );

				return icons.map( ( [ filename, icon ] ) => ( {
					name: filename,
					title: startCase( filename ),
					icon,
					categories: [ directory ],
				} ) );
			} )
		);

		return allIcons.flat();
	} catch ( error ) {
		console.error( 'Error importing icons:', error );
		return [];
	}
}

const directories = [ 'general', 'layout', 'media', 'development', 'charts' ];

const allIcons = await importIcons( directories );

console.log( { allIcons } );

export default allIcons;
