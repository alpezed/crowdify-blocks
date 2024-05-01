import { CountUp } from 'countup.js';

document.addEventListener( 'DOMContentLoaded', () => {
	const containers = document.querySelectorAll(
		'.wp-block-crowdify-counter'
	);

	// Return early, and often.
	if ( ! containers.length ) {
		return;
	}

	// Loop through all counters and assign Counter object.
	containers.forEach( ( element ) => {
		// We could pass in some unique options here.
		let options = {};

		try {
			options = JSON.parse( element.dataset.counter );
		} catch ( e ) {
			// eslint-disable-next-line no-console
			console.error( e );
			return;
		}

		const countUp = new CountUp( element, options.counterNumber, options );
		countUp.start();
	} );
} );
