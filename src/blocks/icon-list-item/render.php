<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$parent_icon_name = $block->context['icon'];
$icon_name = isset ( $attributes['icon'] ) ? $attributes['icon'] : $parent_icon_name;

if ( isset( $parent_icon_name ) ) {
	$parent_default = $parent_icon_name;
	$content = str_replace( 'USE_PARENT_DEFAULT_ICON', $icon_name, $content );
}

$svg_file = '';

if ( ! empty( $icon_name ) ) {
	$directories = [ 'general', 'layout', 'media', 'development', 'charts' ];

	// Get the last part of the filename after the last hyphen
	$new_icon_name = substr( $icon_name, strrpos( $icon_name, '-' ) + 1 );

	// Format the icon_name eg: "untitled-ui-alignTopArrow02" to align-top-arrow-02
	$formatted_icon_name = preg_replace( '/([a-z])([A-Z])/', '$1-$2', $new_icon_name );
	$formatted_icon_name = str_replace( '–', '-', $formatted_icon_name );
	$formatted_icon_name = strtolower( $formatted_icon_name );
	$formatted_icon_name = strtolower( preg_replace( '/(?<!^)([A-Z][a-z]|(?<=[a-z])[A-Z0-9])/', '-$1', $formatted_icon_name ) );

	foreach ( $directories as $directory ) {
		$svg_folder_path = plugin_dir_path( __FILE__ ) . 'svg/' . $directory . '/';

		foreach ( glob( $svg_folder_path . '*.svg' ) as $file ) {
			$filename = basename( $file, '.svg' );

			if ( $filename === $formatted_icon_name ) {
				$svg_file = $file;
			}
		}
	}
}

if ( ! empty( $svg_file ) ) {
	$svg_content = file_get_contents( $svg_file );
	$content = preg_replace( '/<span([^>]*)data-icon="' . $icon_name . '"([^>]*)>(<\/span>)/', '<span$1data-icon="' . $icon_name . '"$2 class="your-class">' . $svg_content . '$3', $content );
}

echo $content;

