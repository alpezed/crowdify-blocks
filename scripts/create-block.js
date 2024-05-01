/* eslint-disable no-console */
const readline = require( 'readline' );
const { execSync } = require( 'child_process' );

const rl = readline.createInterface( {
	input: process.stdin,
	output: process.stdout,
} );

rl.question( 'Enter the block name: ', ( blockName ) => {
	rl.close();

	try {
		execSync(
			`npx @wordpress/create-block@latest ${ blockName } --no-plugin --namespace=crowdify --category=crowdify`,
			{ stdio: 'inherit' }
		);
		console.log( `Block created successfully: ${ blockName }` );
	} catch ( error ) {
		console.error( 'Error creating block:', error.message );
	}
} );
