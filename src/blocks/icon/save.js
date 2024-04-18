import classnames from 'classnames';
import { isEmpty, omit } from 'lodash';

import {
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

import { flattenIconsArray, parseIcon } from '../../utils/icons';
import getIcons from './icons';

export default function save( props ) {
	const { icon, iconName, width, height, justifyContent } = props.attributes;

	// If there is no icon and no iconName, don't save anything.
	if ( ! icon && ! iconName ) {
		return null;
	}

	const iconsAll = flattenIconsArray( getIcons() );
	const namedIcon = iconsAll.find( ( icon ) => icon.name === iconName );
	let printedIcon = '';

	if ( icon && namedIcon ) {
		// Custom icons are strings and need to be parsed.
		printedIcon = parseIcon( icon );

		if ( isEmpty( printedIcon?.props ) ) {
			printedIcon = '';
		}
	} else {
		// Icon choosen from library.
		printedIcon = namedIcon?.icon;

		// Icons provided by third-parties are generally strings.
		if ( typeof printedIcon === 'string' ) {
			printedIcon = parseIcon( printedIcon );
		}
	}

	// If there is no valid SVG icon, don't save anything.
	if ( ! printedIcon ) {
		return null;
	}

	const blockProps = useBlockProps.save();
	const borderProps = getBorderClassesAndStyles( props.attributes );
	const gradientProps = getColorClassesAndStyles( props.attributes );

	const iconClasses = classnames(
		'crowdify-icon',
		borderProps?.className,
		gradientProps?.className,
		{
			[ `items-justified-${ justifyContent }` ]: justifyContent,
			// [ `rotate-${ rotate }` ]: rotate,
			// 'flip-horizontal': flipHorizontal,
			// 'flip-vertical': flipVertical,
		}
	);

	const iconStyles = {
		...blockProps.style,
		...borderProps.style,
		...gradientProps.style,
		width: width ? `${ width }px` : width || '48px',
		height: height ? `${ height }px` : height || undefined,
	};

	const blockPropsClassName = blockProps?.className
		?.replace( /has-background/g, '' )
		?.replace( /has-background-gradient/g, '' )
		?.replace( /has-[a-z0-9-]*-background-color/g, '' )
		?.replace( /has-[a-z0-9-]*-gradient-background/g, '' );
	// Remove the has-background and has-background-gradient classes from the blockProps object
	const modifiedBlockProps = {
		...omit( blockProps, [ 'style' ] ),
		className: classnames( blockPropsClassName, {
			[ `items-justified-${ justifyContent }` ]: justifyContent,
		} ),
	};

	return (
		<div { ...modifiedBlockProps }>
			<div className={ iconClasses } style={ iconStyles }>
				{ printedIcon }
			</div>
		</div>
	);
}
