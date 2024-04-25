/**
 * Internal dependencies
 *
 */

import getIcons from '~/blocks/icon/icons';
import { flattenIconsArray } from '~/utils';

export function useIcon( { iconName, fallbackIconName } ) {
	const iconsAll = flattenIconsArray( getIcons() );

	const namedIcon = iconsAll.find( ( icon ) => {
		if ( iconName ) {
			return icon.name === iconName;
		}

		return icon.name === fallbackIconName;
	} );

	const icon = namedIcon ? namedIcon.icon : '';

	return {
		icon,
	};
}
