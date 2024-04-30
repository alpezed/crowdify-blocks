export function generateResponsiveCSS( selector, styles, property ) {
	// Define breakpoints for different screen sizes
	const breakpoints = {
		desktop: '(min-width: 992px)',
		tablet: '(min-width: 768px) and (max-width: 991.98px)',
		mobile: '(max-width: 767.98px)',
	};

	// Create CSS for each breakpoint
	let css = '';
	for ( const breakpoint in breakpoints ) {
		if ( styles[ breakpoint ] ) {
			css += `@media ${ breakpoints[ breakpoint ] } {`;
			css += `${ selector } {`;
			for ( const subProperty in styles[ breakpoint ] ) {
				css += `${ property }-${ subProperty }: ${ styles[ breakpoint ][ subProperty ] }; `;
			}
			css += '}';
			css += '}';
		}
	}

	// Access the editor iframe
	const editorIframe = document.querySelector( '.editor-canvas__iframe' );

	// If the editor iframe exists, access its document and append the style element
	if ( editorIframe ) {
		const editorHead = editorIframe.contentDocument.head;

		// Create style element and append to the editor iframe head
		const styleElement =
			editorIframe.contentDocument.createElement( 'style' );
		styleElement.innerHTML = css;
		editorHead.appendChild( styleElement );
	}

	// Create style element and append to the document head
	// const styleElement = document.createElement( 'style' );
	// styleElement.innerHTML = css;
	// document.head.appendChild( styleElement );
}
