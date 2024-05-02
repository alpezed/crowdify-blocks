// Define breakpoints for different screen sizes
const breakpoints = {
	desktop: '(min-width: 992px)',
	tablet: '(min-width: 768px) and (max-width: 991.98px)',
	mobile: '(max-width: 767.98px)',
};

export function generateResponsiveCSS( selector, styles, property ) {
	// Create CSS for each breakpoint
	let css = '';
	for ( const breakpoint in breakpoints ) {
		if ( styles[ breakpoint ] ) {
			css += `@media ${ breakpoints[ breakpoint ] } {`;
			css += `${ selector } {`;

			if ( typeof styles[ breakpoint ] !== 'object' ) {
				css += `${ property }: ${
					typeof styles[ breakpoint ] === 'number'
						? styles[ breakpoint ] + 'px'
						: styles[ breakpoint ]
				}; `;
			} else {
				for ( const subProperty in styles[ breakpoint ] ) {
					css += `${ property }-${ subProperty }: ${ styles[ breakpoint ][ subProperty ] }; `;
				}
			}

			css += '}';
			css += '}';
		}
	}

	return css;
}

export function generateResponsiveCSS2( selector, styles ) {
	// Create CSS for each breakpoint
	let css = '';
	for ( const breakpoint in breakpoints ) {
		const cssValues = Object.values( styles ); // [{ "desktop": "" }, { "desktop": "" }]
		if (
			Object.keys( styles )?.length > 0 &&
			cssValues.some( ( obj ) => obj[ breakpoint ] )
		) {
			css += `@media ${ breakpoints[ breakpoint ] } {`;
			css += `${ selector } {`;

			Object.keys( styles ).forEach( ( cssProperty ) => {
				if ( styles[ cssProperty ][ breakpoint ] === undefined ) {
					return;
				}

				if ( typeof styles[ cssProperty ][ breakpoint ] !== 'object' ) {
					css += `${ cssProperty }: ${ styles[ cssProperty ][ breakpoint ] }; `;
				} else {
					for ( const subProperty in styles[ cssProperty ][
						breakpoint
					] ) {
						css += `${ cssProperty }-${ subProperty }: ${ styles[ cssProperty ][ breakpoint ][ subProperty ] }; `;
					}
				}
			} );

			css += '}';
			css += '}';
		}
	}

	return css;
}
