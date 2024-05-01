export function getUniqueId( prefix, uniqueId ) {
	const componentId = uniqueId?.substr( 0, 8 );
	return `${ prefix }-${ componentId }`;
}
