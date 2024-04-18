const fs = require( 'fs' );

// Specify the directory containing the files you want to export
const directoryPath = './src/blocks/icon/icons/untitled-ui/charts';

// Read the directory
fs.readdir( directoryPath, ( err, files ) => {
	if ( err ) {
		console.error( 'Error reading directory:', err );
		return;
	}

	// Filter out non-JavaScript files if needed
	const jsFiles = files.filter( ( file ) => file.endsWith( '.js' ) );

	// Dynamically create export statements for each file
	const exportStatements = jsFiles.map(
		( file ) => `export * from './${ file.replace( '.js', '' ) }';`
	);

	// Write the export statements to a new file
	const exportFilePath = directoryPath + '/index.js';
	fs.writeFile( exportFilePath, exportStatements.join( '\n' ), ( err ) => {
		if ( err ) {
			console.error( 'Error writing export file:', err );
			return;
		}
		console.log( `Exports successfully written to ${ exportFilePath }` );
	} );
} );
