/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

import { useIcon } from '~/hooks/use-icon';

export default function Save( { attributes } ) {
	const { iconName } = attributes;

	const defaultIconName = !! iconName ? iconName : 'USE_PARENT_DEFAULT_ICON';

	const { icon: printedIcon } = useIcon( {
		iconName: defaultIconName,
	} );

	return (
		<li { ...useBlockProps.save() }>
			{ printedIcon }
			<RichText.Content value={ attributes.content } />
			<InnerBlocks.Content />
		</li>
	);
}
