const fs = require( 'fs' );
const path = require( 'path' );

// Path to directory with SVG files
const svgDir = './src/assets/svg/charts';

// Output directory for generated React components
const outDir = './src/blocks/icon/icons/untitled-ui/charts';

// Read SVG files from directory
const svgFiles = fs.readdirSync( svgDir );

svgFiles.forEach( ( file ) => {
	// Parse SVG contents
	const svg = fs.readFileSync( path.join( svgDir, file ), 'utf8' );

	// Convert SVG attributes to camelCase
	const camelCasedSvg = svg.replace(
		/(\w+)-(\w+)=("|')([^"']+?)\3/g,
		( match, p1, p2, p3, p4 ) => {
			const camelCasedP1 =
				p1 + p2.charAt( 0 ).toUpperCase() + p2.slice( 1 );
			return `${ camelCasedP1 }=${ p3 }${ p4 }${ p3 }`;
		}
	);

	// Wrap SVG in JSX
	const jsxSvg = `(
		${ camelCasedSvg }
	)`;

	// Generate component name
	const name = path.parse( file ).name;
	const componentName = name
		.split( '-' )
		.map( ( word, index ) => {
			if ( index === 0 ) return word;
			return (
				word.charAt( 0 ).toUpperCase() + word.slice( 1 ).toLowerCase()
			);
		} )
		.join( '' );

	// Generate code
	const code = `
    export const ${ componentName } = ${ jsxSvg };
  `;

	// Write file with the same name as the original SVG file
	const outFile = path.join( outDir, `${ name }.js` );
	fs.writeFileSync( outFile, code );
} );

console.log( 'Conversion complete!' );
