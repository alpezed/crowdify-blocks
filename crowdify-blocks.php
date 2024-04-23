<?php
/**
 * Plugin Name:       Crowdify Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ed Alpez
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       crowdify-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function crowdify_blocks_block_init() {
	register_block_type( __DIR__ . '/build/blocks/icon' );
	register_block_type( __DIR__ . '/build/blocks/slider' );
	register_block_type( __DIR__ . '/build/blocks/slide' );
	register_block_type( __DIR__ . '/build/blocks/filters' );
	register_block_type( __DIR__ . '/build/blocks/icon-list' );
	register_block_type( __DIR__ . '/build/blocks/icon-list-item' );
}
add_action( 'init', 'crowdify_blocks_block_init' );

/**
 * Enqueues the block editor assets for the Crowdify Blocks plugin.
 *
 * This function checks if the variations.asset.php and hooks.asset.php files exist in the build directory.
 * If they do, it includes their contents and enqueues the corresponding JavaScript and CSS files.
 *
 * @return void
 */
function crowdify_enqueue_block_editor_assets() {
	$variations_file = plugin_dir_path( __FILE__ ) . '/build/variations.asset.php';
	if ( file_exists( $variations_file ) ) {
		$assets = include $variations_file;
		wp_enqueue_script(
			'crowdify-block-variations-js',
			plugin_dir_url( __FILE__ ) . '/build/variations.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);
		wp_enqueue_style( 'crowdify-block-variations-css', plugin_dir_url( __FILE__ ) . '/build/style-variations.css', [], $assets['version'] );
	}

	$hooks_file = plugin_dir_path( __FILE__ ) . '/build/hooks.asset.php';
	if ( file_exists( $hooks_file ) ) {
		$assets = include $hooks_file;
		wp_enqueue_script(
			'crowdify-block-hooks',
			plugin_dir_url( __FILE__ ) . '/build/hooks.js',
			$assets['dependencies'],
			$assets['version'],
			true
		);
	}
}
add_action( 'enqueue_block_editor_assets', 'crowdify_enqueue_block_editor_assets' );

/**
 * Merges the given array of block categories with the 'Crowdify' category.
 *
 * @param array $categories The array of block categories to merge with.
 * @return array The merged array of block categories.
 */
function crowdify_block_categories( $categories )
{
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'crowdify',
				'title' => __( 'Crowdify', 'crowdify' ),
			],
		]
	);
}

add_action( 'block_categories', 'crowdify_block_categories', 10, 2 );

/**
 * Wraps the given block content with a Swiper wrapper if the block is a Crowdify block with a carousel layout.
 *
 * @param string $block_content The content of the block.
 * @param array $block The block data.
 * @return string The wrapped block content.
 */
function crowdify_block_wrapper( $block_content, $block ) {
	/**
	 * Processes the block content to add Swiper classes and attributes.
	 */
	$tag_processor = new WP_HTML_Tag_Processor( $block_content );

	// Check if the block is a Crowdify block with a carousel layout, otherwise return the original content.
	if ( ( isset ( $block['attrs']['crowdify'] ) && $block['attrs']['crowdify']['layout']['type'] !== 'carousel' ) || ! isset ( $block['attrs']['crowdify'] ) ) {
		return $block_content;
	}

	// Swiper attributes.
	$swiper_attr = array(
		'autoplay'   => true,
		'navigation' => true,
		'pagination' => true,
		// 'effect' => $attributes['effect'],
		'speed' => 500,
		'slidesPerView' => 3,
		'spaceBetween' => 30,
	);
	$swiper_attr = htmlspecialchars( wp_json_encode( $swiper_attr ) );

	// Process the UL and LI tags to add Swiper classes.
	while( $tag_processor->next_tag( array( 'tag_name' => 'UL' ) ) ) {
		$tag_processor->add_class( 'swiper-wrapper' );
		while( $tag_processor->next_tag( array( 'tag_name' => 'LI' ) ) ) {
			$tag_processor->add_class( 'swiper-slide' );
		}
	}

	// Build the Swiper wrapper.
	$content = '<div class="swiper" data-swiper="' . esc_attr( $swiper_attr ) . '">';
	$content .= $tag_processor->get_updated_html();
	$content .= '</div>';

	return $content;
}

add_filter( 'render_block_core/post-template', 'crowdify_block_wrapper', 10, 2 );
