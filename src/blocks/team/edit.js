/**
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Import Styles
 */
import './editor.scss';

/**
 * Internal Dependencies
 */
import { DEFAULT_TEAM_TEMPLATE } from './constants';
import { useEffect } from '@wordpress/element';

export default function Edit() {
	// const { attributes, setAttributes } = props;

	useEffect( () => {
		// setAttributes( {
		// 	style: {
		// 		spacing: {
		// 			padding: {
		// 				top: 'var:preset|spacing|80',
		// 				bottom: 'var:preset|spacing|80',
		// 				left: 'var:preset|spacing|50',
		// 				right: 'var:preset|spacing|50',
		// 			},
		// 		},
		// 	},
		// 	backgroundColor: 'gray-900',
		// } );
	}, [] );

	return (
		<div { ...useBlockProps() }>
			<InnerBlocks
				template={ DEFAULT_TEAM_TEMPLATE }
				templateLock="all"
			/>
		</div>
	);
}
