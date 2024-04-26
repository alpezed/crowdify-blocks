/**
 * Wordpress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

import './editor.scss';

import { Slider } from './slider';
import { Inspector } from './inspector';

export default function Edit( props ) {
	const { clientId, attributes } = props;

	const blockProps = useBlockProps();

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<Slider clientId={ clientId } attributes={ attributes } />
			</div>
		</>
	);
}
