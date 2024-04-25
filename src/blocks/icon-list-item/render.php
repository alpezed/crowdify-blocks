<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$parent_icon_name = $block->context['iconName'];

if ( isset( $parent_icon_name ) ) {
	$parent_default = $parent_icon_name;

	$content = str_replace( 'USE_PARENT_DEFAULT_ICON', $parent_default, $content );
}

echo $content;

