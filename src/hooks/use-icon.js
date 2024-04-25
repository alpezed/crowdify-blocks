/**
 * Internal dependencies
 *
 */

import getIcons from '~/blocks/icon/icons';
import { flattenIconsArray } from '~/utils';

export function useIcon( { iconName, fallbackIcon } ) {
	const iconsAll = flattenIconsArray( getIcons() );

	const namedIcon = iconsAll.find( ( icon ) => {
		if ( !! iconName ) {
			return icon.name === iconName;
		}

		return icon.name === fallbackIcon;
	} );

	const icon = namedIcon ? namedIcon.icon : '';

	return {
		icon,
	};
}
