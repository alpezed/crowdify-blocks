/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';
import { useMergeRefs } from '@wordpress/compose';

/**
 * Import styles
 *
 */
import './editor.scss';
import { flattenIconsArray } from '../../utils/icons';
import getIcons from '../icon/icons';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes, context } ) {
	const { placeholder, content, iconName } = attributes;
	const { iconName: fallbackIconName, horizontalSpace, iconSize } = context;

	const iconsAll = flattenIconsArray( getIcons() );
	const namedIcon = iconsAll.find( ( icon ) => icon.name === iconName );
	let printedIcon = namedIcon ? namedIcon.icon : '';

	const blockProps = useBlockProps( {
		style: {
			gap: `${ horizontalSpace }px`,
		},
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		renderAppender: false,
		__unstableDisableDropZone: true,
	} );

	return (
		<li { ...innerBlocksProps }>
			{ printedIcon && (
				<span
					className="list-item-icon"
					style={ { fontSize: `${ iconSize }px` } }
				>
					{ printedIcon }
				</span>
			) }
			<RichText
				identifier="content"
				tagName="div"
				onChange={ ( nextContent ) =>
					setAttributes( { content: nextContent } )
				}
				value={ content }
				aria-label={ __( 'List text' ) }
				placeholder={ placeholder || __( 'List' ) }
			/>
			{ innerBlocksProps.children }
		</li>
	);
}
