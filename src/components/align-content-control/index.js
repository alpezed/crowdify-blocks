/**
 * Internal dependencies
 */
import AlignContentUI from './ui';

const AlignContentControl = ( props ) => {
	return <AlignContentUI { ...props } isToolbar={ false } />;
};

const AlignToolbar = ( props ) => {
	return <AlignContentUI { ...props } isToolbar />;
};

export { AlignContentControl, AlignToolbar };
