import { startCase } from 'lodash';

/**
 * Asynchronously imports icons from specified directories and returns them as an array.
 *
 * @param {Array<string>} directories - An array of directory names to import icons from.
 * @return {Promise<Array<Object>>} - A promise that resolves to an array of objects representing the imported icons.
 * Each object has the following properties:
 * - `name` (string): The name of the icon file.
 * - `title` (string): The title of the icon, converted to start case.
 * - `icon` (Object): The imported icon object.
 * - `categories` (Array<string>): An array containing the directory name the icon was imported from.
 * @throws {Error} - If an error occurs during the import process, an empty array is returned.
 */
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
		return [];
	}
}

const directories = [ 'general', 'layout', 'media', 'development', 'charts' ];

const allIcons = await importIcons( directories );

export default allIcons;
