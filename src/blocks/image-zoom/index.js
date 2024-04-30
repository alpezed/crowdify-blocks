// eslint-disable-next-line import/no-extraneous-dependencies
import mediumZoom from 'medium-zoom/dist/pure';

import './style.scss';

const zoomableElements = document.querySelectorAll( '[data-zoomable]' );

zoomableElements.forEach( ( element ) => {
	const { zoomBackground, zoomMargin, zoomScrollOffset } =
		element.dataset || {};

	mediumZoom( element, {
		margin: parseInt( zoomMargin, 0 ),
		background: zoomBackground,
		scrollOffset: parseInt( zoomScrollOffset, 0 ),
	} );
} );
