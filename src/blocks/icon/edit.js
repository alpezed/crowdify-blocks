import classnames from 'classnames';
import { omit } from 'lodash';

import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
	useBlockProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalUseGradient as useGradient,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';
import {
	DropdownMenu,
	MenuGroup,
	MenuItem,
	ToolbarGroup,
	PanelBody,
	RangeControl,
	Placeholder,
	Button,
} from '@wordpress/components';
import { more } from '@wordpress/icons';
import { useState } from '@wordpress/element';

import { TEXT_DOMAIN } from '../../utils/constants';
import { flattenIconsArray, parseIcon } from '../../utils/icons';
import IconsModal from './components/icons-modal';
import getIcons from './icons';
import { JustifyToolbar } from '../../components/justify-content-control';

import './editor.scss';
import { lightningIcon } from './icons/lightning';

export function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { icon, iconName, width, height, justifyContent } = attributes;

	const { gradientClass, gradientValue } = useGradient();

	const [ isInserterOpen, setInserterOpen ] = useState();

	const iconsAll = flattenIconsArray( getIcons() );
	const namedIcon = iconsAll.find( ( icon ) => icon.name === iconName );
	let printedIcon = namedIcon ? namedIcon.icon : '';

	// Icons provided by third-parties are generally strings.
	if ( typeof printedIcon === 'string' ) {
		printedIcon = parseIcon( printedIcon );
	}

	const blockProps = useBlockProps();
	const borderProps = getBorderClassesAndStyles( attributes );

	const iconClasses = classnames( 'crowdify-icon', {
		'has-background-gradient': gradientValue,
		[ gradientClass ]: gradientClass,
		[ `items-justified-${ justifyContent }` ]: justifyContent,
		// [ `rotate-${ rotate }` ]: rotate,
		// 'flip-horizontal': flipHorizontal,
		// 'flip-vertical': flipVertical,
	} );

	const iconStyles = {
		...blockProps.style,
		...borderProps.style,
		width: width ? `${ width }px` : width || '48px',
		height: height ? `${ height }px` : height || undefined,
	};

	const replaceDropdown = (
		<DropdownMenu
			icon=""
			popoverProps={ {
				className: 'crowdify-icon-block__replace-popover is-alternate',
			} }
			text={ __( 'Replace', 'icon-block' ) }
		>
			{ ( { onClose } ) => (
				<>
					<MenuGroup>
						<MenuItem
							onClick={ () => {
								setInserterOpen( true );
								onClose( true );
							} }
							icon={ lightningIcon }
						>
							{ __( 'Browse icon library', TEXT_DOMAIN ) }
						</MenuItem>
					</MenuGroup>
					<MenuGroup>
						<MenuItem
							onClick={ () => {
								setAttributes( {
									icon: undefined,
									iconName: undefined,
								} );
								onClose( true );
							} }
						>
							{ __( 'Clear icon', TEXT_DOMAIN ) }
						</MenuItem>
					</MenuGroup>
				</>
			) }
		</DropdownMenu>
	);

	const blockControls = (
		<BlockControls group="block">
			<ToolbarGroup>
				<JustifyToolbar
					allowedControls={ [ 'left', 'center', 'right' ] }
					value={ justifyContent }
					onChange={ ( value ) =>
						setAttributes( { justifyContent: value } )
					}
				/>
			</ToolbarGroup>
			{ ( icon || iconName ) && (
				<BlockControls>
					<ToolbarGroup>{ replaceDropdown }</ToolbarGroup>
				</BlockControls>
			) }
		</BlockControls>
	);

	const inspectorControls = ( icon || iconName ) && (
		<>
			<InspectorControls style="settings">
				<PanelBody title={ __( 'Settings' ) }>
					<RangeControl
						label={ __( 'Width', TEXT_DOMAIN ) }
						value={ width }
						onChange={ ( value ) =>
							setAttributes( { width: value } )
						}
						step={ 1 }
						max={ 1000 }
					/>
					<RangeControl
						label={ __( 'Height', TEXT_DOMAIN ) }
						value={ height }
						onChange={ ( value ) =>
							setAttributes( { height: value } )
						}
						step={ 1 }
						max={ 1000 }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);

	const iconMarkup = (
		<>
			{ ! icon && ! iconName ? (
				<Placeholder
					icon={ more }
					label="Icon"
					instructions={ __(
						'Choose an icon from the library, pick one from your media library.',
						TEXT_DOMAIN
					) }
				>
					<Button
						variant="primary"
						onClick={ () => setInserterOpen( true ) }
					>
						{ __( 'Icon Library', TEXT_DOMAIN ) }
					</Button>
				</Placeholder>
			) : (
				<div className={ iconClasses } style={ iconStyles }>
					{ printedIcon }
				</div>
			) }
		</>
	);

	const blockPropsClassName = blockProps.className
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
		<>
			{ blockControls }
			{ inspectorControls }
			<div { ...modifiedBlockProps }>{ iconMarkup }</div>
			<IconsModal
				attributes={ attributes }
				setAttributes={ setAttributes }
				isInserterOpen={ isInserterOpen }
				setInserterOpen={ setInserterOpen }
			/>
		</>
	);
}

export default Edit;
