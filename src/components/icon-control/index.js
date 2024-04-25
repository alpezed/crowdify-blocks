/**
 * Wordpress Dependencies
 *
 */
import { __ } from '@wordpress/i18n';
import {
	Button,
	BaseControl,
	__experimentalHStack as HStack, // eslint-disable-line
} from '@wordpress/components';
import { useState } from '@wordpress/element';

import './editor.scss';
import IconsModal from '~/blocks/icon/components/icons-modal'; // eslint-disable-line
import { useIcon } from '~/hooks/use-icon'; // eslint-disable-line

export function IconControl( { value: icon, label, onChange } ) {
	const [ isInserterOpen, setInserterOpen ] = useState();

	const { icon: printedIcon } = useIcon( {
		iconName: icon,
	} );

	const open = () => setInserterOpen( true );

	return (
		<>
			<BaseControl label={ label } id="editor-icon-control">
				<div className="editor-icon-control__container">
					<Button
						className={
							! icon
								? 'editor-icon-control__toggle'
								: 'editor-icon-control__preview'
						}
						onClick={ open }
						aria-label={
							! icon ? null : __( 'Edit or replace the image' )
						}
						aria-describedby={
							! icon
								? null
								: `editor-icon-control-${ icon }-describedby`
						}
					>
						{ !! icon && printedIcon }
						{ ! icon && __( 'Select Icon' ) }
					</Button>
					{ !! icon && (
						<HStack className="editor-icon-control__actions">
							<Button
								className="editor-icon-control__action"
								onClick={ open }
							>
								{ __( 'Replace' ) }
							</Button>
							<Button
								className="editor-icon-control__action"
								onClick={ () => {
									onChange( '' );
								} }
							>
								{ __( 'Remove' ) }
							</Button>
						</HStack>
					) }
				</div>
			</BaseControl>
			<IconsModal
				icon={ icon }
				onSelect={ onChange }
				isInserterOpen={ isInserterOpen }
				setInserterOpen={ setInserterOpen }
			/>
		</>
	);
}
